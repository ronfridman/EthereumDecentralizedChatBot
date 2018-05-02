
function readNumberFromBC(result)
{
  return result['c'][0];
}


function getRoleNameById(roleId)
{
  myRoleName = 'NOT NOTAUTHORIZED';

  if(roleId == 1)
  myRoleName = 'OBSERVER';
  else if(roleId == 2)
  myRoleName = 'MEMBER';
  else if(roleId == 3)
  myRoleName = 'ADMIN';

  return myRoleName;
}

function getColorByNumber(number)
{
  switch(number) {
    case 0:
      return 'CRIMSON';
    break;
    case 1:
      return 'ROYALBLUE';
    break;
    case 2:
      return 'LIMEGREEN';
    break;
    case 3:
      return 'GOLD';
    break;
    case 4:
      return 'organge';
    break;
    case 5:
      return 'CYAN';
    break;
    case 6:
      return 'BLUEVIOLET';
    break;
    case 7:
      return 'LIGHTSALMON';
    break;
    case 8:
      return 'DEEPPINK';
    break;
    case 9:
      return 'DARKGRAY';
    break;
    default:
      return 'black';
  }
}


function timeAgo(time){
  var units = [
    { name: "second", limit: 60, in_seconds: 1 },
    { name: "minute", limit: 3600, in_seconds: 60 },
    { name: "hour", limit: 86400, in_seconds: 3600  },
    { name: "day", limit: 604800, in_seconds: 86400 },
    { name: "week", limit: 2629743, in_seconds: 604800  },
    { name: "month", limit: 31556926, in_seconds: 2629743 },
    { name: "year", limit: null, in_seconds: 31556926 }
  ];
  var diff = (new Date() - new Date(time*1000)) / 1000;
  if (diff < 5) return "now";

  var i = 0, unit;
  while (unit = units[i++]) {
    if (diff < unit.limit || !unit.limit){
      var diff =  Math.floor(diff / unit.in_seconds);
      return diff + " " + unit.name + (diff>1 ? "s" : "");
    }
  };
}
