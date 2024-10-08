$(function () {
    Array.prototype.forEach.call(document.getElementsByClassName('mw-scratch-confirmaccount-expiration-timestamp'), el => {
        const timestampTimeInput = el.form.expiration_timestamp_time;
        timestampTimeInput.disabled = el.value !== 'othertime';
        el.addEventListener('change', () => {
            timestampTimeInput.disabled = el.value !== 'othertime';
        });
    });
});

$(function () {
    Array.prototype.forEach.call(document.getElementsByClassName('mw-scratch-confirmaccount-request-form'), el => {
        if (!el.shouldOpenScratchPage) return;
        if (el.shouldOpenScratchPage.value === '1') {
            el.addEventListener('submit', ev => {
                const profileLink = document.getElementById('mw-scratch-confirmaccount-profile-link');
                if (profileLink) profileLink.click();
            });
        }
    });
});

$(function () {
    Array.prototype.forEach.call(document.getElementsByClassName('mw-scratch-confirmaccount-bigselect'), el => {
        el.onchange = function (event) {
            const value = event.target.value;
            const textInput = document.getElementById(el.id.replace(/-dropdown$/, ''));
            textInput.value = value;
        };
    });
  });

$(function () {
    const elem = document.getElementById("mw-scratch-confirmaccount-click-copy");
    if (!elem) return;
    elem.onclick = function() {
        copyToClipboard(document.getElementById("mw-scratch-confirmaccount-verifcode"));
        mw.notify( mw.message( 'scratch-confirmaccount-click-copy-alert', { autoHide: true }, {autoHideSeconds: 5}) ); // Use an i18n message to send a notification
    }
});

function copyToClipboard(temptext) {
        var tempItem = document.createElement('textarea');
        tempItem.value = temptext.innerText;
        tempItem.style.top = "-999px";
        tempItem.style.left = "-999px";
        tempItem.style.position = "fixed";
        document.body.appendChild(tempItem);
        tempItem.focus();
        tempItem.select();
        document.execCommand('copy');
        tempItem.parentElement.removeChild(tempItem);
      }


$(function () {
    const elem = document.getElementsByName("scratchusername")[0];
    if (!elem) return;

    elem.onkeyup = function() {
	var currentname = elem.value || "";
        var usernameblock = new OO.ui.infuse(elem.closest('.oo-ui-layout'));
	// Start with username input field, and go to the entire username container that OOUI will infuse onto
	var noticebox = [];
	if(currentname.length > 0){
		if(currentname.match("^_+|_+$|__+")){
			noticebox[0] = new mw.message("scratch-confirmaccount-username-disallowed").text();
		}
		else{
			if(currentname[0].match("[A-Za-z]")){// Compare first letter to a regex, to check if it starts with an uppercase or lowercase letter
				noticebox[0] = new mw.message("scratch-confirmaccount-username-warning", currentname[0].toUpperCase() + currentname.slice(1)).text();
				// If they may want alternative capitalization, add a preview of how it will look once it's approved
			}
		}
	}
	usernameblock.setNotices(noticebox);// Save out any notices (importantly, this will *remove* a notice if it no longer applies)
    }
});
