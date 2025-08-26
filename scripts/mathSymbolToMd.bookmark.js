(function (global) {
  function transformMathStr(text) {
    const flagReg = /\s*\\(\(|\)|\[|\])\s*/g;
    return text.replace(flagReg, function (match, p1) {
      let target = "";
      if ("()".includes(p1)) {
        target = "$";
      }
      if ("[]".includes(p1)) {
        target = "$$";
      }
      return target;
    });
  }
  function createModal() {
    const modal = document.createElement("div");
    modal.style.position = "absolute";
    modal.style.right = "0";
    modal.style.top = "0";
    modal.style.width = "350px";
    modal.style.padding = `20px`;
    modal.style.zIndex = "9999";
    modal.style.background = "#fff";
    modal.innerHTML = `
            <p>将ai问答中的数学公式转为markdown</p>
            <textarea style="width: 100%;" rows="20" autofocus ></textarea>
            <button style="background: #f60; color: #fff; width: 60px; text-align: center; border: none; cursor: pointer;">确定</button>
        `;

    document.body.append(modal);
    const textarea = modal.querySelector("textarea");
    modal
      .querySelector("button")
      .addEventListener("click", () => handleTransform(textarea.value));

    const removeModal = () => {
      modal.innerHTML = "";
      document.body.removeChild(modal);
    };
    const submit = () => {
      removeModal();
    };
    const cancel = () => {
      removeModal();
    };

    return {
      submit,
      removeModal,
      modal,
    };
  }

  function copyTextToClipboard(text) {
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

  // @ts-ignore
  global.__handleTransform = handleTransform;

  const { removeModal } = createModal();

  async function handleTransform(text) {
    text = transformMathStr(text);
    copyTextToClipboard(text);
    removeModal();
  }
})(window);
