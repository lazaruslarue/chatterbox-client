
$(document).ready(function(){
  $('.updater').on('click',function(){
    getMessages();
    printMessages(listOfMessages);
  });
  $('.submit').on('click', function(){
    var userMessage = $('input').val().toString();
    sendMessage(userMessage);
  });

});

//GLOBALS



var userName=''; // grab this from the prompt
var listOfMessages = [];
var mostRecentUpdate = '';
var characterLimits = {
    "objectId": 24,
    "roomname": 50,
    'text':140,
    'updatedAt': 24,
    'username': 50
  };

//RETRIEVING MESSAGES

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
  _.each(messageJSON, function(val, i, coll) {
    var content = messageJSON[i];
    content = content.slice(0,characterLimits[i]);
    $('<div></div>')
      .addClass(i)
      .text(content)
      .appendTo($messageNode);
  });
  listOfMessages.push($messageNode);
};

var printMessages = function(listOfMessages){
  _.each(listOfMessages, function(msgNode, i) {
    if (i % 2) {
      $('#left').append(msgNode);
    } else {
      $('#right').append(msgNode);
    }
  });
};

// SUBMITTING MESSAGES

var composeMessage = function(userText) {
  var sendJSON = {};
  userName = window.location.search;
  userName = userName.split('=')[1];
  sendJSON.username = userName;
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


var evilMessage = function(userText) {
  var evilJSON = {};
  userName = window.location.search;
  userName = userName.split('=')[1];
  evilJSON.userName = userName;
  // evilJSON['\<script\>window.location.reload\<\/script\>'] = true;
  evilJSON.script = "$('body').css('color','white')";
  evilJSON.style = "font-size=600px;";
  evilJSON.text = userText;
  evilJSON.roomname = '4chan';
  return evilJSON;
};

var evilSend = function(input) {
  var toSend = evilMessage(input);
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