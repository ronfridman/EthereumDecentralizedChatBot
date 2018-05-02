
if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
} else {
  // set the provider you want from Web3.providers
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}


web3.eth.defaultAccount = web3.eth.accounts[0];

var ChatBotContract;
var ChatBot;

$("#chatChannelAddressButton").click(function() {
  var contractTXID = $("#chatChannelAddress").val();
  ChatBotContract = web3.eth.contract(contractABI);
  ChatBot = ChatBotContract.at(contractTXID);

  loadMyRole();
  getParticipants();

  setInterval(function() {
    getParticipants() // method to be executed;
  }, 5000);

});

// console.log(ChatBot);

var myRole = 0;
var myRoleName = 'NOT NOTAUTHORIZED';
var msgCount = 0;
var messages = [];
var participants = [];


function getColorForAddress(address)
{
    for(var i=0; i<participants.length; i++)
    {
        if(participants[i].address == address)
          return participants[i].color;
    }
    return 'black';
}


function loadMyRole()
{

  ChatBot.getRole(function(error,result){
    if(!error)
    {
      myRole = readNumberFromBC(result);
      myRoleName = getRoleNameById(myRole);
      log('My Role: ' + myRoleName + '(' + myRole + ')');
    }
    else
    {
      console.error(error);
    }
  });

}

function readMessages()
{

  ChatBot.readMassegesCount(function(error,result){
    if(!error)
    {
      msgCount = readNumberFromBC(result);
      log('msg Count: ' + msgCount);
    }
    else
    {
      console.error(error);
    }
  });


  ChatBot.readMasseges(function(error,result){
    if(!error)
    {
      $("#messages").empty();

      messages = [];
      _ids = result[0];
      _timestamps = result[1];
      _address = result[2];
      _messageBytes = result[3];

      for(var i=0; i< _ids.length; i++)
      {
        var message = {
          id: readNumberFromBC(_ids[i]),
          timestamp: readNumberFromBC(_timestamps[i]),
          address: _address[i],
          msgBytes: web3.toAscii(_messageBytes[i])
        }

        var activeCSS = (message.address == web3.eth.defaultAccount) ? 'active' : '';
        var HTML = '' +
                '<div class="card ' + activeCSS + '">' +
                  '<div class="card-header">' +
                  '<div class="avatar" style="background-color:' + getColorForAddress(message.address) + ';"></div> ...' + message.address.substr(message.address.length - 8) +
                  '<div style="float: right;">' + timeAgo(message.timestamp) + '</div>' +
                  '</div>' +
                  '<div class="card-body">' +
                  '  <p class="card-text">' + message.msgBytes + '</p>' +
                  '</div>' +
                '</div>';


        $("#messages").append(HTML);

        messages.push(message);
      }

      log('messages');
      log(messages);
    }
    else
    {
      console.error(error);
    }
  });
}


function getParticipants()
{
  ChatBot.getParticipants(function(error,result){
    if(!error)
    {
      $("#participants").empty();

      participants = [];
      _addresses = result[0];
      _roles = result[1];


      for(var i=0; i< _addresses.length; i++)
      {
        var roleId = readNumberFromBC(_roles[i]);
        var participant = {
          role: roleId,
          roleName: getRoleNameById(roleId),
          address: _addresses[i],
          color: getColorByNumber(i)
        }

        var activeCSS = (participant.address == web3.eth.defaultAccount) ? 'active' : '';
        var HTML =  '' +
            '<li class="list-group-item ' + activeCSS + '">' +
              '<div class="avatar" style="background-color:' + participant.color + '"></div>' +
              ' ...' + participant.address.substr(participant.address.length - 5) + ' (' + participant.roleName + ')' +
            '</li>';

        $("#participants").append(HTML);

        participants.push(participant);
      }

      log('participants');
      log(participants);
    }
    else
    {
      console.error(error);
    }

    readMessages();
  });

}


$("#sendMsgButton").click(function() {

  var msgData = $("#sendMsgInput").val();
  if(msgData.length == 0)
  {
    alert('msg is empty;');
  }
  else
  {
    ChatBot.postMessage(msgData,function(error,result){});
    $("#sendMsgInput").val("");
  }
});

function log(logData)
{
  if(false)
  {
    console.log(logData);
  }
}



