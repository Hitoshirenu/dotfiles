define(["popup_ui","spin.min","search_bar"],function(PopupUI,Spinner,SearchBar){var previousNotifs;var minIntervalMs=3e4;var spinner=new Spinner({color:"#666",lines:8,width:4});function update(firstRender){function renderData(data){spinner.stop();if(!data||data.serverError){PopupUI.justShow(PopupUI.serverErrorUI)}else if(!data.loggedIn){PopupUI.justShow(PopupUI.loggedOutUI)}else{PopupUI.justShow(PopupUI.loggedInUI);updateNotifs(data)}}chrome.runtime.sendMessage({getUpdatedData:true},function(data){if(firstRender&&(!data||!data.notifs)){setTimeout(function(){chrome.runtime.sendMessage({getUpdatedData:true},function(firstRenderData){renderData(firstRenderData)})},2500)}else{renderData(data)}})}function updateInterval(firstRender){spinner.spin($(".quora_chrome_extension")[0]);chrome.runtime.sendMessage({getUpdateInterval:true},function(interval){update(firstRender);if(interval&&interval>=minIntervalMs){setTimeout(function(){updateInterval(false)},interval)}})}function updateNotifs(data){if(!notifsHaveChanged(data)){return}updateNewNotifsText(data);updateNewMessagesText(data)}function updateNewNotifsText(data){var count=data.notifs.unseen_count;if(count===0){$("#notif_view_all").text("Notifications")}else{var content="<span class='bubble'>"+count+"</span>";var text="Notification";if(count!=1){text+="s"}content+=text;$("#notif_view_all").html(content)}}function updateNewMessagesText(data){var count=data.inbox.unread_count;if(count==0){$("#inbox").text("Messages")}else{var content="<span class='bubble'>"+count+"</span>";var text="Message";if(count!=1){text+="s"}content+=text;$("#inbox").html(content)}}function notifyClicked(){chrome.runtime.sendMessage({clicked:true})}function notifsHaveChanged(data){var previous=previousNotifs;var current=data.notifs;previousNotifs=data.notifs;if(!previous){return true}if(previous.unseen.length!=current.unseen.length){return true}for(var i=0;i<current.unseen.length;i++){if(previous.unseen[i]!=current.unseen[i]){return true}}return false}function setup(){updateInterval(true);$("#notif_view_all").on("click",function(){notifyClicked()});SearchBar.setup()}var Popup={setup:setup};return Popup});