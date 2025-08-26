(function () {
  const title = $("#summary-val")[0].textContent;
  const bugId = $(".issue-link")[0].textContent;
  const res = `bug-fix: fixed ${bugId}, ${title}`;
  fallbackCopyTextToClipboard(res);
  function fallbackCopyTextToClipboard(text) {
    var textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      var successful = document.execCommand("copy");
      var msg = successful ? "successful" : "unsuccessful";
      console.log("Fallback: Copying text command was" + msg);
    } catch (err) {
      console.error("Fallback: Oops, unable to copy", err);
    }
    document.body.removeChild(textArea);
  }
})();
