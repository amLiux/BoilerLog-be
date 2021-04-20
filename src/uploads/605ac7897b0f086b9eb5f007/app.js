var getLog = "";
const CONSTS = {
    TRANSMIT_UI_CONTAINER_ID: 'transmitContainer',
    SESSION_STORAGE_KEY: 'transmit_token'
}

const transmitSDK = xmsdk.XmSdk(); // the Transmit SDK object
const defaultUIHandler = new xmui.XmUIHandler();

function initJourneyPlayer() {
    const settings = getTransmitConnectionSettings();
    transmitSDK.setConnectionSettings(settings);

    //UI Handlers
    //transmitSDK.setUiHandler(defaultUIHandler);
    transmitSDK.setUiHandler(new MyUIHandler());

    transmitSDK.initialize()
    .then((results) => {
        console.log(`Transmit SDK initialised successfully: ${results}`);
        createLog(`Transmit SDK initialised successfully: ${results}`);
        if (!getSessionToken()) {
            showLoginWithUserId();
        } else {
            showAuthenticatedUserUI();
        }
    })
    .catch((error) => {
        console.error(`Transmit SDK initialisation error!: ${error}`);
    });
}

function showLoginWithUserId() {
    hideAllAppContainers();
    $('#login_with_userid_container').show();
}

function getTransmitConnectionSettings() {
    const serverUrl = "http://localhost:8521";
    const appId = "chelo_web";
    let settings = com.ts.mobile.sdk.SDKConnectionSettings.create(serverUrl, appId);
    return settings;
}


function hideAllAppContainers() {
    const appContainerIds = ['login_with_userid_container', 'authenticated_user_ui'];
    appContainerIds.forEach(id => $(`#${id}`).hide());
}

function onPageInitLoad() {
    hideAllAppContainers();
    initJourneyPlayer();
    //alert("Starter app is setup correctly!");
}

$(document).ready(function () { 
    onPageInitLoad(); // Called when the page is starting to load
});

//to clear the toke, we call this
function updateSessionToken(token) {
    if (!token) {
        sessionStorage.removeItem(CONSTS.SESSION_STORAGE_KEY.TRANSMIT_TOKEN);
        return;
    }
    sessionStorage.setItem(CONSTS.SESSION_STORAGE_KEY.TRANSMIT_TOKEN, token);
}

function getSessionToken() {
    return sessionStorage.getItem(CONSTS.SESSION_STORAGE_KEY.TRANSMIT_TOKEN);
}

function setAppContentVisible(visible) {
    if (visible) {
        $("#appContent").show();
    } else {
        //$("#appContent").hide();
        $("#appContent").show();
    }
}

function getClientContext() {
    return {
        uiContainer: document.getElementById(CONSTS.TRANSMIT_UI_CONTAINER_ID)
    };
}

function onDeviceManagement(){
    const clientContext = getClientContext();

    let getVal = transmitSDK.startDeviceManagementSession();
    debugger;
    console.log(getVal);   
    createLog(getVal); 
}


function onUITicketWaitSession(){
    const clientContext = getClientContext();

    //let getVal = transmitSDK.UITicketWaitSession.startSession(,clientContext);
    //startSession(actionContext: PolicyAction | null, clientContext: object | null)
    //com.ts.mobile.sdk.UITicketWaitSession.startSession();
    
    debugger;
   // console.log(getVal);   
    //createLog(getVal); 
}


function onAuthenticate() {
    //debugger;
    const userId = $(`#input_userid`).val();
    if (!userId || userId.length === 0) {
        alert('Please fill in your userId to authenticate');
        return;
    }
    setAppContentVisible(false);

    const clientContext = getClientContext();
    const additionalParams = {
        amountOfCash: 15001
    };
    
    const journeyName = "default_auth";

    transmitSDK.authenticate(userId, journeyName, additionalParams, clientContext)
        .then((results) => {
            const token = results.getToken();
            updateSessionToken(token); // store to maintain state between page/tab reloads
            transmitJourneyEnded(clientContext); // clear the Transmit UI
            console.log(results)
            //console.log(`Success!: ${token}`);
            showAuthenticatedUserUI();
        })
        .catch((error) => {
            console.error(`Authenticate Error: ${error}`);
            transmitJourneyEnded(clientContext); // clear also on error
        });
}

function transmitJourneyEnded(clientContext) {
    $(clientContext.uiContainer).html('');
    setAppContentVisible(true);
}

function onLogout() {
    transmitSDK.logout()
    .then((results) => {
        updateSessionToken(null); // clears the token from the session
        showLoginWithUserId();
    })
    .catch((error) => {
        console.log(`Authenticate Error: ${error}`);
        createErrorLog(`Authenticate Error: ${error}`);
    });
}

function invokeJourney() {
    setAppContentVisible(false);
    
    const clientContext = getClientContext();
    const policyName = "RecheckingTemp";
    const additionalParams = {};
    
    transmitSDK.invokePolicy(policyName, additionalParams, clientContext)
    .then((results) => {
        console.log(`Example journey ended successfully: ${results}`);
        createLog(`Example journey ended successfully: ${results}`);
        transmitJourneyEnded(clientContext);
    })
    .catch((err) => {
        console.error(`Example journey ended with error: ${err.getMessage()}`);
        transmitJourneyEnded(clientContext);
    });
}


function totp() {
    setAppContentVisible(false);
    
    const clientContext = getClientContext();
    const policyName = "Check_TOTP";
    //UIHandler.createTotpAuthSession
    const additionalParams = {};
    
    transmitSDK.invokePolicy(policyName, additionalParams, clientContext)
    .then((results) => {
        console.log(`Example journey ended successfully: ${results}`);
        createLog(`Example journey ended successfully: ${results}`);
        transmitJourneyEnded(clientContext);
    })
    .catch((err) => {
        console.error(`Example journey ended with error: ${err.getMessage()}`);
        transmitJourneyEnded(clientContext);
    });
}



function OTP() {
    var OTPType = $("#OTPType").val();
    //alert(OTPType);

    if(OTPType!=""){

    }else{
        alert("Kindly select OTP Type!");
        return false;
    }
    
    setAppContentVisible(false);
    
    const clientContext = getClientContext();
    const policyName = OTPType;
    //UIHandler.createTotpAuthSession
    const additionalParams = {};
    
    transmitSDK.invokePolicy(policyName, additionalParams, clientContext)
    .then((results) => {
        console.log(`Example journey ended successfully: ${results}`);
        createLog(`Example journey ended successfully: ${results}`);
        transmitJourneyEnded(clientContext);
    })
    .catch((err) => {
        console.error(`Example journey ended with error: ${err.getMessage()}`);
        transmitJourneyEnded(clientContext);
    });
}


function invokeAuthenticatorConfig() {
    setAppContentVisible(false)
    
    const clientContext = getClientContext()

    transmitSDK.startAuthenticationConfiguration(clientContext)
    .then((results) => {
        console.log(`Finished configuration with results: ${results}`);
        createLog(`Finished configuration with results: ${results}`);
        transmitJourneyEnded(clientContext);
    })
    .catch((err) => {
        console.error(`Error: ${err.getMessage()}`);
        transmitJourneyEnded(clientContext);
    });
}

function showAuthenticatedUserUI() {
    hideAllAppContainers()
    $('#authenticated_user_ui').show();
}

function onInvokeUserless() {
    setAppContentVisible(false);
    
    const clientContext = getClientContext();
    const policyName = "userless";
    const additionalParams = {};
    
    transmitSDK.invokeAnonymousPolicy(policyName, additionalParams, clientContext)
    .then((results) => {
        console.log(`Userless journey ended successfully: ${results}`);
        createLog(`Userless journey ended successfully: ${results}`);
        transmitJourneyEnded(clientContext);
    })
    .catch((err) => {
        console.error(`Userless journey ended with error: ${err.getMessage()}`);
        createErrorLog(`Userless journey ended with error: ${err.getMessage()}`);
        transmitJourneyEnded(clientContext);
    });
}

function createLog(getLog){
    $("#currentLogs").append('<p style="color:green;font-size:12px">'+getLog+'</p>');
}

function createErrorLog(getLog){
    $("#currentLogs").append('<p style="color:red;font-size:12px">'+getLog+'</p>');
}

function getChannelDetails() {
     let getChannels = transmitSDK.getChannel();
     console.log(getChannels);   
     createLog(getChannels); 
}




function getJourney() {
    const policyName = $("#idJourney").val();
    if(policyName){
        setAppContentVisible(false);
        const clientContext = getClientContext();
        const additionalParams = {};      
        transmitSDK.invokePolicy(policyName, additionalParams, clientContext)
        .then((results) => {
            console.log(`Example journey ended successfully: ${results}`);
            createLog(`Example journey ended successfully: ${results}`);
            transmitJourneyEnded(clientContext);
        })
        .catch((err) => {
            console.error(`Example journey ended with error: ${err.getMessage()}`);
            transmitJourneyEnded(clientContext);
        });
    }
    else{
        alert("Check Policy/Journey Name!");
        return false;
    }
    
    
}