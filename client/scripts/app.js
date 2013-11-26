
$(document).ready(function(){
  // $('#main').prepend($('<'));
  $('.updater').on('click',function(){
    getMessages();
    printMessages(listOfMessages);
  });
  $('.submit').on('click', function(){
    var userMessage = $('input').val().toString();
    sendMessage(userMessage);
  });

});


var userName=''; // grab this from the prompt
var listOfMessages = [];
var mostRecentUpdate = '';


var getMessages = function(){
  $.ajax({
    // always use this url
    url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'GET',
    contentType: 'application/json',
    data: {"order" :"-createdAt"},
    // {"where": {
    //       "objectId":"teDOY3Rnpe"
    //       // "order":"-createdAt"
    //     }
    //   },
    success: function (data) {
      _.each(data.results, function(messageJSON){
        renderMessage(messageJSON);
      });
      printMessages(listOfMessages);
      // console.log(data);
    },
    error: function (data) {
      // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to get message');
    }
  });
};

var renderMessage = function(messageJSON){
  var $messageNode = $('<div></div>');
  $messageNode.addClass('message');
  for (var k in messageJSON) {
    var $msgPart = $('<span></span>');
    $msgPart.addClass(k);
    $messageNode.append($msgPart.text(messageJSON[k]));
  }
  listOfMessages.push($messageNode);
};

var printMessages = function(listOfMessages){
  _.each(listOfMessages, function(msgNode) {
    $('#main').append(msgNode);
  });
};

var composeMessage = function(userText) {
  var sendJSON = {};
  userName = window.location.search;
  userName = userName.split('=')[1];
  sendJSON.userName = userName;
  sendJSON.text = userText;
  sendJSON.roomname = '4chan';
  return sendJSON;
};

var sendMessage = function(input) {
  var toSend = composeMessage(input);
  $.ajax({
    url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'POST',
    data: JSON.stringify(toSend),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message');
    }
  });
};


// Object {results: Array[100]}
// results: Array[100]
// 0: Object
// createdAt: "2013-10-07T16:22:03.280Z"
// objectId: "teDOY3Rnpe"
// roomname: "lobby"
// text: "hello"
// updatedAt: "2013-10-07T16:22:03.280Z"
// username: "gary"
// message: 

// var message = {
//   'username': 'shawndrost',
//   'text': 'trololo',
//   'roomname': '4chan'
// };


// get JSON

// post to Parse

// discect the Parse response

// construct message DOMs from parts of ParseObj




// eventually: 
// autoupdate - get new messages on some set interval and ignore old messages

// look @ user pages 
//

// ChatterBox.prototype.getMessages = function(){
//   $.ajax({
//     // always use this url
//     url: 'https://api.parse.com/1/classes/chatterbox',
//     type: 'GET',
//     contentType: 'application/json',

//     success: function (data) {
//       this.renderMessage();
//       _.each(data.results, function(messageJSON){
//         renderMessage.call(that, messageJSON);
//         console.log('got some messages, ', messageJSON); //debugging
//       });
//     },

//     error: function (data) {
//       // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
//       console.error('chatterbox: Failed to get message');
//     }
//   });
// };