$(function () {

  var secretNumber = null;
  var history = [];

  // Generate random number
  function generateNumber() {
    var min = parseInt($('#range-min').val());
    var max = parseInt($('#range-max').val());

    if (isNaN(min) || isNaN(max) || min >= max) {
      showResult('Tetapkan julat yang sah (Min < Max).', 'wrong', '');
      return;
    }

    secretNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    history = [];

    $('#secret-display').text('? ? ?');
    $('#guess-input').val('').prop('disabled', false).focus();
    $('#btn-check').prop('disabled', false);
    $('#result-block').empty();
    $('#history-block').hide();
    $('#history-list').empty();
  }

  // Check guess
  function checkGuess() {
    if (secretNumber === null) {
      showResult('Jana nombor dahulu.', 'wrong', '');
      return;
    }

    var guess = parseInt($('#guess-input').val());

    if (isNaN(guess)) {
      showResult('Masukkan nombor yang sah.', 'wrong', '');
      return;
    }

    var isCorrect = guess === secretNumber;

    history.push({ val: guess, correct: isCorrect });
    renderHistory();

    if (isCorrect) {
      $('#secret-display').text(secretNumber);
      showResult('BETUL!', 'correct', 'Kamu teka ' + history.length + ' kali.');
      $('#btn-check').prop('disabled', true);
      $('#guess-input').prop('disabled', true);
    } else {
      var hint = guess < secretNumber
        ? 'Terlalu rendah. Cuba lebih tinggi.'
        : 'Terlalu tinggi. Cuba lebih rendah.';
      showResult('SALAH!', 'wrong', hint);
      $('#guess-input').val('').focus();
    }
  }

  function showResult(msg, type, sub) {
    var html = '<div class="result-msg">' + msg + '</div>';
    if (sub) html += '<div class="result-sub">' + sub + '</div>';
    $('#result-block').html(html);
  }

  function renderHistory() {
    $('#history-block').show();
    $('#history-list').empty();
    $.each(history, function (i, item) {
      var tag = $('<span>')
        .addClass('history-tag ' + (item.correct ? 'correct' : 'wrong'))
        .text(item.val);
      $('#history-list').append(tag);
    });
  }

  function resetGame() {
    secretNumber = null;
    history = [];
    $('#secret-display').text('? ? ?');
    $('#guess-input').val('').prop('disabled', true);
    $('#btn-check').prop('disabled', true);
    $('#result-block').empty();
    $('#history-block').hide();
    $('#history-list').empty();
  }

  // Event bindings
  $('#btn-generate').on('click', generateNumber);
  $('#btn-check').on('click', checkGuess);
  $('#btn-reset').on('click', resetGame);

  $('#guess-input').on('keypress', function (e) {
    if (e.which === 13) checkGuess();
  });

});