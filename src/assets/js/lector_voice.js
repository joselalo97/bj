var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

function testSpeech() {
  var grammar = ''
  var recognition = new SpeechRecognition();
  var speechRecognitionList = new SpeechGrammarList();
  speechRecognitionList.addFromString(grammar, 1);
  recognition.grammars = speechRecognitionList;
  recognition.lang = 'es-ES';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;
  recognition.start(); 

  recognition.onresult = function (event) {
    var speechResult = event.results[0][0].transcript.toLowerCase();
    document.getElementById('vioce_agent').value = speechResult;
    document.getElementById('btn-search').click()
  }

  recognition.onspeechend = function () {
    recognition.stop();
  }

  recognition.onerror = function (event) {

  }

  recognition.onaudiostart = function (event) {
    document.getElementById('onsound').classList.add('read-voice')
  }

  recognition.onaudioend = function (event) {
    //Fired when the user agent has finished capturing audio.
  }

  recognition.onend = function (event) {
    //Fired when the speech recognition service has disconnected.
    document.getElementById('file-voice-js').remove();
    document.getElementById('onsound').classList.remove('read-voice')
  }

  recognition.onnomatch = function (event) {
    //Fired when the speech recognition service returns a final result with no significant recognition. This may involve some degree of recognition, which doesn't meet or exceed the confidence threshold.
  }

  recognition.onsoundstart = function (event) {
    //Fired when any sound — recognisable speech or not — has been detected.
  }

  recognition.onsoundend = function (event) {
    //Fired when any sound — recognisable speech or not — has stopped being detected.
  }

  recognition.onspeechstart = function (event) {
    //Fired when sound that is recognised by the speech recognition service as speech has been detected.
  }
  recognition.onstart = function (event) {
    //Fired when the speech recognition service has begun listening to incoming audio with intent to recognize grammars associated with the current SpeechRecognition.
  }
}

testSpeech();
