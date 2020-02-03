export default function (context) {
  if (process.client) {
    window.addEventListener("beforeunload", function (e) {
      var confirmationMessage = "Do you want to close ?";
      this.removeEventListener("beforeunload", ()=>{});
      (e || window.event).returnValue = confirmationMessage; //Gecko + IE
      return confirmationMessage;                            //Webkit, Safari, Chrome
    });
  }
}