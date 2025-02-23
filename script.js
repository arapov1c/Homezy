document.addEventListener("DOMContentLoaded", () => {
    let previousPage = null;
    let holdTimeout; // Čuva timeout kada korisnik drži dugme
    let deleteMode = false;
    let loggedInUsername = "";
    let loggedInPassword = "";
    let timer;
    let isPopupOpen = false; // Sprečava klik ako je popup otvoren
    let longPressTime = 500; // Vrijeme u ms za dugi pritisak
    let selectedItem = null; // Element koji je kliknut

    const homepage = document.getElementById("homepage");
    const loginpage = document.getElementById("loginpage");
    const signuppage = document.getElementById("signuppage");
    const dashboardPage = document.getElementById("dashboard");
    const smartSchedulerPage = document.getElementById("smartschedulerpage");
    const kitchenPage = document.getElementById("kitchenpage");
    const bathroomPage = document.getElementById("bathroompage");
    const profilePage = document.getElementById("profilepage");
    const yourProfilePage = document.getElementById("yourprofilepage");
    const ACKPage = document.getElementById("ACKpage");
    const ACLRPage = document.getElementById("ACLRpage");
    const LKPage = document.getElementById("LKpage");
    const LBPage = document.getElementById("LBpage");
    const ovenPage = document.getElementById("ovenpage");
    const BBPage = document.getElementById("BBpage");
    const VSPage = document.getElementById("vspage");
    const VSKPage = document.getElementById("vskpage");
    const VSLRPage = document.getElementById("vslrpage");
    const alertPage = document.getElementById("alertpage");
    const fridgePage = document.getElementById("fridgepage");
    const dishwasherPage = document.getElementById("dishwasherpage");
    const livingroomPage = document.getElementById("livingroompage");
    const bedroomPage = document.getElementById("bedroompage");
    const LBRpage = document.getElementById("LBRpage");
    const LLRPage = document.getElementById("LLRpage");
    const catfeederPage = document.getElementById("catfeederpage");
    const appContainer = document.querySelector(".phone-frame");
    const dialPointer = document.querySelector(".dial-pointer");
    const tempDisplay = document.getElementById("oven-temp-display");
    const dial = document.querySelector(".dial");
    const modeButtons = document.querySelectorAll(".mode-btn");

    const loginButton = document.querySelector("#loginpage .btn");
    const signUpButton = document.querySelector("#signuppage .btn");
    const logInButtonTab = document.querySelector("#signuppage .tab:nth-child(1)");// Selektuje prvi tab (Log in)
    const signUpButtonTab = document.querySelector("#loginpage .tab:nth-child(2)"); // Selektuje drugi tab (Sign up)
    const smartSchedulerButton = document.getElementById("smart-scheduler-button");
    const livingRoomButton = document.querySelector(".grid-item:nth-child(1)");
    const kitchenButton = document.querySelector(".grid-item:nth-child(2)"); // Pretpostavka da je Kitchen dugme drugo u mreži
    const boilerButton = document.querySelector("#bathroompage .grid-item:nth-child(5)");
    const bathroomButton = document.querySelector(".grid-item:nth-child(4)");
    const bedroomButton = document.querySelector(".grid-item:nth-child(3)");

    const vsButton = document.querySelector("#dashboard .video-button");
    const vskButton = document.querySelector("#kitchenpage .video-button");
    const vslrButton = document.querySelector("#livingroompage .video-button");
    const vsbrButton = document.querySelector("#bedroompage .video-button");

    const backButtonKitchen = document.querySelector("#kitchenpage .back-button");
    const backButtonACK = document.querySelector("#ACKpage .back-button");
    const backButtonLK = document.querySelector("#LKpage .back-button");
    const backButtonLB = document.querySelector("#LBpage .back-button");
    const backButtonBath = document.querySelector("#bathroompage .back-button");
    const backButtonVS = document.querySelector("#vspage .back-button");
    const backButtonOven = document.querySelector("#ovenpage .back-button");
    const backButtonBB = document.querySelector("#BBpage .back-button");
    const backButtonProfile = document.querySelector("#profilepage .back-button");
    const backButtonYourProfile = document.querySelector("#yourprofilepage .back-button");
    const backButtonVSK = document.querySelector("#vskpage .back-button");
    const backButtonVSLR = document.querySelector("#vslrpage .back-button");
    const backButtonDishwasher = document.querySelector("#dishwasherpage .back-button");
    const backButtonLivingroom = document.querySelector("#livingroompage .back-button");
    const backButtonbedroom = document.querySelector("#bedroompage .back-button");
    const backButtonLBR = document.querySelector("#LBRpage .back-button");
    const backButtonACLR = document.querySelector("#ACLRpage .back-button");
    const backButtonLLR = document.querySelector("#LLRpage .back-button");
    const backButtonCatfeeder = document.querySelector("#catfeederpage .back-button");
    const backButtonSmartScheduler = document.querySelector("#smartschedulerpage .back-button");
    const backButtonFridge = document.querySelector("#fridgepage .back-button");
    const backButtonDial = document.querySelector("#dialpage .back-button");
    const HomeButtonKitchen = document.querySelector("#kitchenpage .icon.home");
    const HomeButtonACK = document.querySelector("#ACKpage .icon.home");
    const HomeButtonLK = document.querySelector("#LKpage .icon.home");
    const HomeButtonOven = document.querySelector("#ovenpage .icon.home");
    const HomeButtonBath = document.querySelector("#bathroompage .icon.home");
    const HomeButtonLB = document.querySelector("#LBpage .icon.home");
    const HomeButtonVS = document.querySelector("#vspage .icon.home");
    const HomeButtonBB = document.querySelector("#BBpage .icon.home");
    const HomeButtonProfile = document.querySelector("#profilepage .icon.home");
    const HomeButtonYourProfile = document.querySelector("#yourprofilepage .icon.home");
    const HomeButtonFridge = document.querySelector("#fridgepage .icon.home");
    const HomeButtonVSK = document.querySelector("#vskpage .icon.home");
    const HomeButtonVSLR = document.querySelector("#vslrpage .icon.home");
    const HomeButtonDishwasher = document.querySelector("#dishwasherpage .icon.home");
    const HomeButtonAddRoom = document.querySelector("#addroompage .icon.home");
    const HomeButtonLivingroom = document.querySelector("#livingroompage .icon.home");
    const HomeButtonACLR = document.querySelector("#ACLRpage .icon.home");
    const HomeButtonLLR = document.querySelector("#LLRpage .icon.home");
    const HomeButtonCatfeeder = document.querySelector("#catfeederpage .icon.home");
    const HomeButtonSmartScheduler = document.querySelector("#smartschedulerpage .icon.home");
    const HomeButtonPozovi = document.querySelector("#dialPage .icon.home");
    const ACKButton = document.querySelector("#kitchenpage .grid-item:nth-child(1)");
    const LKButton = document.querySelector("#kitchenpage .grid-item:nth-child(2)");
    const LBButton = document.querySelector("#bathroompage .grid-item:nth-child(2)");
    const ovenButton = document.querySelector("#kitchenpage .grid-item:nth-child(3)");
    const dishwasherButton = document.querySelector("#kitchenpage .grid-item:nth-child(5)");
    const BLButton = document.querySelector("#bedroompage .grid-item:nth-child(1)");
    const ACLRButton = document.querySelector("#livingroompage .grid-item:nth-child(1)");
    const LLRButton = document.querySelector("#livingroompage .grid-item:nth-child(2)");
    const catfeederButton = document.querySelector("#livingroompage .grid-item:nth-child(3)");

    const ACBRButton = document.querySelector("#bedroompage .grid-item:nth-child(1)");
    const LLBRutton = document.querySelector("#bedroompage .grid-item:nth-child(2)");

    const profileButtonHome = document.querySelector("#dashboard .icon.profile");
    const profileButtonKitchen = document.querySelector("#kitchenpage .icon.profile");
    const profileButtonBath = document.querySelector("#bathroompage .icon.profile");
    const profileButtonLB = document.querySelector("#LBpage .icon.profile");
    const profileButtonACK = document.querySelector("#ACKpage .icon.profile");
    const profileButtonOven = document.querySelector("#ovenpage .icon.profile");
    const profileButtonBB = document.querySelector("#BBpage .icon.profile");
    const profileButtonVS = document.querySelector("#vspage .icon.profile");
    const profileButtonLK = document.querySelector("#LKpage .icon.profile");
    const profileButtonYourProfile = document.querySelector("#yourprofilepage .icon.profile");
    const profileButtonFridge = document.querySelector("#fridgepage .icon.profile");
    const profileButtonVSK = document.querySelector("#vskpage .icon.profile");
    const profileButtonVSLR = document.querySelector("#vslrpage .icon.profile");
    const profileButtonDishwasher = document.querySelector("#dishwasherpage .icon.profile");
    const profileButtonLivingroom = document.querySelector("#livingroompage .icon.profile");
    const profileButtonBedroom = document.querySelector("#bedroompage .icon.profile");
    const profileButtonACLR = document.querySelector("#ACLRpage .icon.profile");
    const profileButtonWashingMachine = document.querySelector("#washingmachinepage .icon.profile");
    const profileButtonDryer = document.querySelector("#dryerpage .icon.profile");
    const profileButtonLLR = document.querySelector("#LLRpage .icon.profile");
    const profileButtonCatfeeder = document.querySelector("#catfeederpage .icon.profile");
    const profileButtonSmartScheduler = document.querySelector("#smartschedulerpage .icon.profile");

    const logoutButton = document.querySelector("#profilepage .logout-btn");
    const yourprofileButton = document.querySelector("#your-profile");

    const checkAlertButton = document.querySelector("#dashboard .alert-icon");
    // Prikaži početnu stranicu, zatim nakon 1 sekunde prebaci na login stranicu
    setTimeout(() => {
        homepage.classList.add("hidden"); // Sakriva HomePage
        homepage.style.display = "none"; // Potpuno uklanja iz prikaza
        loginpage.classList.remove("hidden");
        loginpage.style.display = "flex";
    }, 1000); // 1000 ms = 1 sekunda

    document.querySelectorAll(".toggle-password").forEach(icon => {
        icon.addEventListener("click", () => {
            const targetId = icon.getAttribute("data-target");
            const passwordField = document.getElementById(targetId);

            if (passwordField.type === "password") {
                passwordField.type = "text";
                icon.textContent = "🔒"; // Promjena ikonice na katanac
            } else {
                passwordField.type = "password";
                icon.textContent = "👁️"; // Vraćamo oko
            }
        });
    });
    
    function convertTo12HourFormat(time24) {
      const [hours, minutes] = time24.split(':');
      let hour = parseInt(hours, 10);
      const ampm = hour >= 12 ? 'PM' : 'AM';
      hour = hour % 12;
      if (hour === 0) {
        hour = 12;
      }
      return `${hour}:${minutes} ${ampm}`;
    }


    logInButtonTab.addEventListener("click", () => {
        signuppage.classList.add("hidden");
        signuppage.style.display = "none";
        loginpage.classList.remove("hidden");
        loginpage.style.display = "flex";
    });

    signUpButtonTab.addEventListener("click", () => {
        loginpage.classList.add("hidden");
        loginpage.style.display = "none";
        signuppage.classList.remove("hidden");
        signuppage.style.display = "flex";
    });

    function showPopup(message, popupId) {
        const popup = document.getElementById(popupId);
        if (!popup) {
            console.error(`Popup with ID "${popupId}" not found.`);
            return;
        }

        const popupMessage = popup.querySelector(".popup-message");
        const popupClose = popup.querySelector(".popup-close");

        if (!popupMessage || !popupClose) {
            console.error(`Popup structure incorrect in "${popupId}".`);
            return;
        }

        popupMessage.textContent = message;
        popup.style.display = "flex";

        popupClose.addEventListener("click", () => {
            popup.style.display = "none";
        }, { once: true }); // `once: true` osigurava da se event listener dodaje samo jednom
    }
    
    function showPopup(message, popupId, onConfirm) {
      const popup = document.getElementById(popupId);
      if (!popup) {
        console.error(`Popup with ID "${popupId}" not found.`);
        return;
      }
      const popupMessage = popup.querySelector(".popup-message");
      const popupClose = popup.querySelector(".popup-close");

      if (!popupMessage || !popupClose) {
        console.error(`Popup structure incorrect in "${popupId}".`);
        return;
      }

      popupMessage.textContent = message;
      popup.style.display = "flex";

      popupClose.addEventListener("click", () => {
        popup.style.display = "none";
        if (onConfirm && typeof onConfirm === "function") {
          onConfirm();
        }
      }, { once: true });
    }


    function applyChildRestrictions() {
        console.log("Ograničenja postavljena za korisnika 'dijete'");

        // Lista dozvoljenih uređaja i soba
        const allowedDevices = ["Cat feeder", "Lights", "Air conditioner", "Fridge", "Boiler"];
        const allowedRooms = ["Living room", "Kitchen", "Bedroom", "Bathroom"];

        // Onemogućavanje interakcije samo s nedozvoljenim uređajima
        document.querySelectorAll(".grid-item").forEach(item => {
            const itemName = item.textContent.trim();

            // Ako je soba ili dozvoljeni uređaj, neka ostane interaktivna
            if (allowedRooms.includes(itemName) || allowedDevices.includes(itemName)) {
                return;
            }

            item.style.pointerEvents = "none";
            item.style.opacity = "0.5";
        });

        // Onemogućavanje svih uređaja osim svjetla, klime, hranilice za mačke i frižidera
        document.querySelectorAll("input[type='checkbox']").forEach(toggle => {
            if (!toggle.id.includes("ac-toggle") &&
                !toggle.id.includes("ac-toggle-LK1") &&
                !toggle.id.includes("ac-toggle-LK2") &&
                !toggle.id.includes("ac-toggle-LB1") &&
                !toggle.id.includes("ac-toggle-LB2") &&
                !toggle.id.includes("ac-toggle-BB1") &&
                !toggle.id.includes("aclr-toggle") &&
                !toggle.id.includes("light") &&
                !toggle.id.includes("cat") &&
                !toggle.id.includes("fridge")) {
                toggle.disabled = true;
            }
        });

        // Onemogućavanje svih klizača osim intenziteta svjetla
        document.querySelectorAll("input[type='range']").forEach(slider => {
            if (!slider.id.includes("light-intensity")) {
                slider.disabled = true;
            }
        });

        // Onemogućavanje pristupa Smart Scheduler-u
        const schedulerButton = document.getElementById("smart-scheduler-button");
        if (schedulerButton) {
            schedulerButton.style.pointerEvents = "none";
            schedulerButton.style.opacity = "0.5";
        }
    }
    // Kada korisnik klikne "Log in"
    loginButton.addEventListener("click", () => {
        const usernameInput = document.getElementById("username").value.trim();
        const passwordInput = document.getElementById("password").value.trim();
        const welcomeMessage = document.getElementById("welcome-message");

        if (!usernameInput) {
            showPopup("Please enter a username!", "popup-login");
            return;
        }
        if (!passwordInput) {
            showPopup("Please enter your password!", "popup-login");
            return;
        }

        loggedInUsername = usernameInput;
        if (loggedInUsername === "dijete") {
            applyChildRestrictions();
        }
        loggedInPassword = passwordInput;
        welcomeMessage.textContent = `Welcome, ${loggedInUsername}!`;


        loginpage.classList.add("hidden");
        loginpage.style.display = "none";
        dashboardPage.classList.remove("hidden");
        dashboardPage.style.display = "flex";
    });
    // Kada korisnik klikne "Sign up"
    signUpButton.addEventListener("click", () => {
        const username2Input = document.getElementById("username2").value.trim();
        const password3Input = document.getElementById("password3").value.trim();
        const password2Input = document.getElementById("password2").value.trim();
        const welcomeMessage = document.getElementById("welcome-message");

        if (!username2Input) {
            showPopup("Please enter a username!", "popup-signup");
            return;
        }

        if (!password3Input) {
            showPopup("Please enter a password!", "popup-signup");
            return;
        }

        if (!password2Input) {
            showPopup("Please confirm a password!", "popup-signup");
            return;
        }

        if (password2Input != password3Input) {
            showPopup("The passwords didn't match!", "popup-signup");
            return;
        }

        loggedInUsername = username2Input;
        loggedInPassword = password2Input;
        welcomeMessage.textContent = `Welcome, ${loggedInUsername}!`;


        signuppage.classList.add("hidden");
        signuppage.style.display = "none";
        dashboardPage.classList.remove("hidden");
        dashboardPage.style.display = "flex";
    });

    vsButton.addEventListener("click", () => {
        dashboardPage.classList.add("hidden");
        dashboardPage.style.display = "none";
        VSPage.classList.remove("hidden");
        VSPage.style.display = "flex";
    });

    vskButton.addEventListener("click", () => {
        kitchenPage.classList.add("hidden");
        kitchenPage.style.display = "none";
        VSKPage.classList.remove("hidden");
        VSKPage.style.display = "flex";
    });

    vslrButton.addEventListener("click", () => {
        livingroomPage.classList.add("hidden");
        livingroomPage.style.display = "none";
        VSLRPage.classList.remove("hidden");
        VSLRPage.style.display = "flex";
    });

    bedroomButton.addEventListener("click", () => {
        dashboardPage.classList.add("hidden");
        dashboardPage.style.display = "none";
        dashboardPage.classList.remove("hidden");
        dashboardPage.style.display = "flex";
    });
    BLButton.addEventListener("click", () => {
        bedroomPage.classList.add("hidden");
        bedroomPage.style.display = "none";
        LBRpage.classList.remove("hidden");
        LBRpage.style.display = "flex";
    });
    
    smartSchedulerButton.addEventListener("click", () => {
        dashboardPage.classList.add("hidden");
        dashboardPage.style.display = "none";
        smartSchedulerPage.classList.remove("hidden");
        smartSchedulerPage.style.display = "flex";
    });
    // Kada korisnik klikne na "Kitchen" dugme
    kitchenButton.addEventListener("click", () => {
        dashboardPage.classList.add("hidden");
        dashboardPage.style.display = "none";
        kitchenPage.classList.remove("hidden");
        kitchenPage.style.display = "flex";
    });

    livingRoomButton.addEventListener("click", () => {
        dashboardPage.classList.add("hidden");
        dashboardPage.style.display = "none";
        livingroomPage.classList.remove("hidden");
        livingroomPage.style.display = "flex";
    });


    bathroomButton.addEventListener("click", () => {
        dashboardPage.classList.add("hidden");
        dashboardPage.style.display = "none";
        bathroomPage.classList.remove("hidden");
        bathroomPage.style.display = "flex";
    });

    boilerButton.addEventListener("click", () => {
        bathroomPage.classList.add("hidden");
        bathroomPage.style.display = "none";
        BBPage.classList.remove("hidden");
        BBPage.style.display = "flex";
    });

    dishwasherButton.addEventListener("click", () => {
        kitchenPage.classList.add("hidden");
        kitchenPage.style.display = "none";
        dishwasherPage.classList.remove("hidden");
        dishwasherPage.style.display = "flex";
    });

    ACLRButton.addEventListener("click", () => {
        livingroomPage.classList.add("hidden");
        livingroomPage.style.display = "none";
        ACLRPage.classList.remove("hidden");
        ACLRPage.style.display = "flex";
    });

    LLRButton.addEventListener("click", () => {
        livingroomPage.classList.add("hidden");
        livingroomPage.style.display = "none";
        LLRPage.classList.remove("hidden");
        LLRPage.style.display = "flex";
    });

    catfeederButton.addEventListener("click", () => {
        livingroomPage.classList.add("hidden");
        livingroomPage.style.display = "none";
        catfeederPage.classList.remove("hidden");
        catfeederPage.style.display = "flex";
    });

    HomeButtonLivingroom.addEventListener("click", () => {
        livingroomPage.classList.add("hidden");
        livingroomPage.style.display = "none";
        dashboardPage.classList.remove("hidden");
        dashboardPage.style.display = "flex";
    });

    HomeButtonKitchen.addEventListener("click", () => {
        kitchenPage.classList.add("hidden");
        kitchenPage.style.display = "none";
        dashboardPage.classList.remove("hidden");
        dashboardPage.style.display = "flex";
    });
   
    
    HomeButtonAddRoom.addEventListener("click", () => {
        addRoomPage.classList.add("hidden");
        addRoomPage.style.display = "none";
        dashboardPage.classList.remove("hidden");
        dashboardPage.style.display = "flex";
    });

    HomeButtonBath.addEventListener("click", () => {
        bathroomPage.classList.add("hidden");
        bathroomPage.style.display = "none";
        dashboardPage.classList.remove("hidden");
        dashboardPage.style.display = "flex";
    });

    HomeButtonLB.addEventListener("click", () => {
        LBPage.classList.add("hidden");
        LBPage.style.display = "none";
        dashboardPage.classList.remove("hidden");
        dashboardPage.style.display = "flex";
    });

    HomeButtonBB.addEventListener("click", () => {
        BBPage.classList.add("hidden");
        BBPage.style.display = "none";
        dashboardPage.classList.remove("hidden");
        dashboardPage.style.display = "flex";
    });

    HomeButtonVS.addEventListener("click", () => {
        VSPage.classList.add("hidden");
        VSPage.style.display = "none";
        dashboardPage.classList.remove("hidden");
        dashboardPage.style.display = "flex";
    });

    HomeButtonYourProfile.addEventListener("click", () => {
        yourProfilePage.classList.add("hidden");
        yourProfilePage.style.display = "none";
        dashboardPage.classList.remove("hidden");
        dashboardPage.style.display = "flex";
    });

    HomeButtonFridge.addEventListener("click", () => {
        fridgePage.classList.add("hidden");
        fridgePage.style.display = "none";
        dashboardPage.classList.remove("hidden");
        dashboardPage.style.display = "flex";
    });
    HomeButtonVSK.addEventListener("click", () => {
        VSKPage.classList.add("hidden");
        VSKPage.style.display = "none";
        dashboardPage.classList.remove("hidden");
        dashboardPage.style.display = "flex";
    });

    HomeButtonVSLR.addEventListener("click", () => {
        VSLRPage.classList.add("hidden");
        VSLRPage.style.display = "none";
        dashboardPage.classList.remove("hidden");
        dashboardPage.style.display = "flex";
    });
    HomeButtonDishwasher.addEventListener("click", () => {
        dishwasherPage.classList.add("hidden");
        dishwasherPage.style.display = "none";
        dashboardPage.classList.remove("hidden");
        dashboardPage.style.display = "flex";
    });

    HomeButtonACLR.addEventListener("click", () => {
        ACLRPage.classList.add("hidden");
        ACLRPage.style.display = "none";
        dashboardPage.classList.remove("hidden");
        dashboardPage.style.display = "flex";
    });
    HomeButtonLLR.addEventListener("click", () => {
        LLRPage.classList.add("hidden");
        LLRPage.style.display = "none";
        dashboardPage.classList.remove("hidden");
        dashboardPage.style.display = "flex";
    });
    HomeButtonCatfeeder.addEventListener("click", () => {
        catfeederPage.classList.add("hidden");
        catfeederPage.style.display = "none";
        dashboardPage.classList.remove("hidden");
        dashboardPage.style.display = "flex";
    });

    HomeButtonSmartScheduler.addEventListener("click", () => {
        smartSchedulerPage.classList.add("hidden");
        smartSchedulerPage.style.display = "none";
        dashboardPage.classList.remove("hidden");
        dashboardPage.style.display = "flex";
    });

    ACKButton.addEventListener("click", () => {
        kitchenPage.classList.add("hidden");
        kitchenPage.style.display = "none";
        ACKPage.classList.remove("hidden");
        ACKPage.style.display = "flex";
    });

    LKButton.addEventListener("click", () => {
        kitchenPage.classList.add("hidden");
        kitchenPage.style.display = "none";
        LKPage.classList.remove("hidden");
        LKPage.style.display = "flex";
    });

    LBButton.addEventListener("click", () => {
        bathroomPage.classList.add("hidden");
        bathroomPage.style.display = "none";
        LBPage.classList.remove("hidden");
        LBPage.style.display = "flex";
    });

    ovenButton.addEventListener("click", () => {
        kitchenPage.classList.add("hidden");
        kitchenPage.style.display = "none";
        ovenPage.classList.remove("hidden");
        ovenPage.style.display = "flex";

        if (progress && tempDisplay && manualInput) {
            progress.setAttribute("stroke-dashoffset", "565.48");
            progress.style.strokeDashoffset = "564.76";
            tempDisplay.textContent = "0°";
            manualInput.value = 0;
        }
    });

    yourprofileButton.addEventListener("click", () => {
        document.getElementById("username-field").value = loggedInUsername;
        document.getElementById("password-field").value = loggedInPassword;
        profilePage.classList.add("hidden");
        profilePage.style.display = "none";
        yourProfilePage.classList.remove("hidden");
        yourProfilePage.style.display = "flex";
    });

    backButtonLivingroom.addEventListener("click", () => {
        livingroomPage.classList.add("hidden");
        livingroomPage.style.display = "none";
        dashboardPage.classList.remove("hidden");
        dashboardPage.style.display = "flex";
    });
    backButtonLBR.addEventListener("click", () => {
        LBRpage.classList.add("hidden");
        LBRpage.style.display = "none";
        bedroomPage.classList.remove("hidden");
        bedroomPage.style.display = "flex";
    });
    backButtonDial.addEventListener("click", () => {
        dialPage.classList.add("hidden");
        dialPage.style.display = "none";
        dashboardPage.classList.remove("hidden");
        dashboardPage.style.display = "flex";
    });
    backButtonACLR.addEventListener("click", () => {
        ACLRPage.classList.add("hidden");
        ACLRPage.style.display = "none";
        livingroomPage.classList.remove("hidden");
        livingroomPage.style.display = "flex";
    });
    backButtonKitchen.addEventListener("click", () => {
        kitchenPage.classList.add("hidden");
        kitchenPage.style.display = "none";
        dashboardPage.classList.remove("hidden");
        dashboardPage.style.display = "flex";
    });

    backButtonACK.addEventListener("click", () => {
        ACKPage.classList.add("hidden");
        ACKPage.style.display = "none";
        kitchenPage.classList.remove("hidden");
        kitchenPage.style.display = "flex";
    });

    logoutButton.addEventListener("click", () => {
        profilePage.classList.add("hidden");
        profilePage.style.display = "none";
        loginpage.classList.remove("hidden");
        loginpage.style.display = "flex";
    });


    backButtonLK.addEventListener("click", () => {
        LKPage.classList.add("hidden");
        LKPage.style.display = "none";
        kitchenPage.classList.remove("hidden");
        kitchenPage.style.display = "flex";
    });

    backButtonbedroom.addEventListener("click", () => {
        bedroomPage.classList.add("hidden");
        bedroomPage.style.display = "none";
        dashboardPage.classList.remove("hidden");
        dashboardPage.style.display = "flex";
    });

    backButtonLB.addEventListener("click", () => {
        LBPage.classList.add("hidden");
        LBPage.style.display = "none";
        bathroomPage.classList.remove("hidden");
        bathroomPage.style.display = "flex";
    });

    backButtonBB.addEventListener("click", () => {
        BBPage.classList.add("hidden");
        BBPage.style.display = "none";
        bathroomPage.classList.remove("hidden");
        bathroomPage.style.display = "flex";
    });

    backButtonBath.addEventListener("click", () => {
        bathroomPage.classList.add("hidden");
        bathroomPage.style.display = "none";
        dashboardPage.classList.remove("hidden");
        dashboardPage.style.display = "flex";
    });

    backButtonOven.addEventListener("click", () => {
        ovenPage.classList.add("hidden");
        ovenPage.style.display = "none";
        kitchenPage.classList.remove("hidden");
        kitchenPage.style.display = "flex";
    });

    backButtonVS.addEventListener("click", () => {
        VSPage.classList.add("hidden");
        VSPage.style.display = "none";
        dashboardPage.classList.remove("hidden");
        dashboardPage.style.display = "flex";
    });
    backButtonProfile.addEventListener("click", () => {
        profilePage.classList.add("hidden");
        profilePage.style.display = "none";

        if (previousPage) {
            previousPage.classList.remove("hidden");
            previousPage.style.display = "flex";
        }
    });
    backButtonYourProfile.addEventListener("click", () => {
        yourProfilePage.classList.add("hidden");
        yourProfilePage.style.display = "none";
        profilePage.classList.remove("hidden");
        profilePage.style.display = "flex";
    });

    backButtonVSK.addEventListener("click", () => {
        VSKPage.classList.add("hidden");
        VSKPage.style.display = "none";
        kitchenPage.classList.remove("hidden");
        kitchenPage.style.display = "flex";
    });

    backButtonVSLR.addEventListener("click", () => {
        VSLRPage.classList.add("hidden");
        VSLRPage.style.display = "none";
        livingroomPage.classList.remove("hidden");
        livingroomPage.style.display = "flex";
    });

    backButtonDishwasher.addEventListener("click", () => {
        dishwasherPage.classList.add("hidden");
        dishwasherPage.style.display = "none";
        kitchenPage.classList.remove("hidden");
        kitchenPage.style.display = "flex";
    });

    backButtonLLR.addEventListener("click", () => {
        LLRPage.classList.add("hidden");
        LLRPage.style.display = "none";
        livingroomPage.classList.remove("hidden");
        livingroomPage.style.display = "flex";
    });

    backButtonCatfeeder.addEventListener("click", () => {
        catfeederPage.classList.add("hidden");
        catfeederPage.style.display = "none";
        livingroomPage.classList.remove("hidden");
        livingroomPage.style.display = "flex";
    });

    backButtonSmartScheduler.addEventListener("click", () => {
        smartSchedulerPage.classList.add("hidden");
        smartSchedulerPage.style.display = "none";
        dashboardPage.classList.remove("hidden");
        dashboardPage.style.display = "flex";
    });


    profileButtonHome.addEventListener("click", () => {
        previousPage = document.querySelector(".page:not(.hidden)");

        previousPage.classList.add("hidden");
        previousPage.style.display = "none";

        profilePage.classList.remove("hidden");
        profilePage.style.display = "flex";
    });
    profileButtonKitchen.addEventListener("click", () => {
        previousPage = document.querySelector(".page:not(.hidden)");

        previousPage.classList.add("hidden");
        previousPage.style.display = "none";

        profilePage.classList.remove("hidden");
        profilePage.style.display = "flex";
    });
    profileButtonBath.addEventListener("click", () => {
        previousPage = document.querySelector(".page:not(.hidden)");

        previousPage.classList.add("hidden");
        previousPage.style.display = "none";

        profilePage.classList.remove("hidden");
        profilePage.style.display = "flex";
    });
    profileButtonBB.addEventListener("click", () => {
        previousPage = document.querySelector(".page:not(.hidden)");

        previousPage.classList.add("hidden");
        previousPage.style.display = "none";

        profilePage.classList.remove("hidden");
        profilePage.style.display = "flex";
    });
    profileButtonOven.addEventListener("click", () => {
        previousPage = document.querySelector(".page:not(.hidden)");

        previousPage.classList.add("hidden");
        previousPage.style.display = "none";

        profilePage.classList.remove("hidden");
        profilePage.style.display = "flex";
    });
    profileButtonVS.addEventListener("click", () => {
        previousPage = document.querySelector(".page:not(.hidden)");

        previousPage.classList.add("hidden");
        previousPage.style.display = "none";

        profilePage.classList.remove("hidden");
        profilePage.style.display = "flex";
    });
    profileButtonLK.addEventListener("click", () => {
        previousPage = document.querySelector(".page:not(.hidden)");

        previousPage.classList.add("hidden");
        previousPage.style.display = "none";

        profilePage.classList.remove("hidden");
        profilePage.style.display = "flex";
    });
    profileButtonLB.addEventListener("click", () => {
        previousPage = document.querySelector(".page:not(.hidden)");

        previousPage.classList.add("hidden");
        previousPage.style.display = "none";

        profilePage.classList.remove("hidden");
        profilePage.style.display = "flex";
    });
    profileButtonACK.addEventListener("click", () => {
        previousPage = document.querySelector(".page:not(.hidden)");

        previousPage.classList.add("hidden");
        previousPage.style.display = "none";

        profilePage.classList.remove("hidden");
        profilePage.style.display = "flex";
    });

    profileButtonYourProfile.addEventListener("click", () => {
        previousPage = document.querySelector(".page:not(.hidden)");

        previousPage.classList.add("hidden");
        previousPage.style.display = "none";

        profilePage.classList.remove("hidden");
        profilePage.style.display = "flex";
    });

    profileButtonFridge.addEventListener("click", () => {
        previousPage = document.querySelector(".page:not(.hidden)");

        previousPage.classList.add("hidden");
        previousPage.style.display = "none";

        profilePage.classList.remove("hidden");
        profilePage.style.display = "flex";
    });
    profileButtonVSK.addEventListener("click", () => {
        previousPage = document.querySelector(".page:not(.hidden)");

        previousPage.classList.add("hidden");
        previousPage.style.display = "none";

        profilePage.classList.remove("hidden");
        profilePage.style.display = "flex";
    });

    profileButtonVSLR.addEventListener("click", () => {
        previousPage = document.querySelector(".page:not(.hidden)");

        previousPage.classList.add("hidden");
        previousPage.style.display = "none";

        profilePage.classList.remove("hidden");
        profilePage.style.display = "flex";
    });

    profileButtonDishwasher.addEventListener("click", () => {
        previousPage = document.querySelector(".page:not(.hidden)");

        previousPage.classList.add("hidden");
        previousPage.style.display = "none";

        profilePage.classList.remove("hidden");
        profilePage.style.display = "flex";
    });

    profileButtonLivingroom.addEventListener("click", () => {
        previousPage = document.querySelector(".page:not(.hidden)");

        previousPage.classList.add("hidden");
        previousPage.style.display = "none";

        profilePage.classList.remove("hidden");
        profilePage.style.display = "flex";
    });

    profileButtonACLR.addEventListener("click", () => {
        previousPage = document.querySelector(".page:not(.hidden)");

        previousPage.classList.add("hidden");
        previousPage.style.display = "none";

        profilePage.classList.remove("hidden");
        profilePage.style.display = "flex";
    });
    profileButtonWashingMachine.addEventListener("click", () => {
        previousPage = document.querySelector(".page:not(.hidden)");

        previousPage.classList.add("hidden");
        previousPage.style.display = "none";

        profilePage.classList.remove("hidden");
        profilePage.style.display = "flex";
    });

    profileButtonDryer.addEventListener("click", () => {
        previousPage = document.querySelector(".page:not(.hidden)");

        previousPage.classList.add("hidden");
        previousPage.style.display = "none";

        profilePage.classList.remove("hidden");
        profilePage.style.display = "flex";
    });

    profileButtonLLR.addEventListener("click", () => {
        previousPage = document.querySelector(".page:not(.hidden)");

        previousPage.classList.add("hidden");
        previousPage.style.display = "none";

        profilePage.classList.remove("hidden");
        profilePage.style.display = "flex";
    });
    profileButtonCatfeeder.addEventListener("click", () => {
        previousPage = document.querySelector(".page:not(.hidden)");

        previousPage.classList.add("hidden");
        previousPage.style.display = "none";

        profilePage.classList.remove("hidden");
        profilePage.style.display = "flex";
    });

    profileButtonSmartScheduler.addEventListener("click", () => {
        previousPage = document.querySelector(".page:not(.hidden)");

        previousPage.classList.add("hidden");
        previousPage.style.display = "none";

        profilePage.classList.remove("hidden");
        profilePage.style.display = "flex";
    });

    //ACK
    let wantedTemp = 15;
    const minTemp = -5;
    const maxTemp = 30;

    const wantedTempInput = document.getElementById("wanted-temp");
    const acToggle = document.getElementById("ac-toggle");
    const acStatus = document.getElementById("ac-status");

    // Inicijalno onemogućiti unos temperature jer je AC isključen
    wantedTempInput.value = wantedTemp;
    wantedTempInput.disabled = true;

    // Funkcija za toggle dugme
    acToggle.addEventListener("change", () => {
        if (acToggle.checked) {
            acStatus.textContent = "AC is ON";
            wantedTempInput.disabled = false;
        } else {
            acStatus.textContent = "AC is OFF";
            wantedTempInput.disabled = true;
        }
    });
    wantedTempInput.addEventListener("input", (event) => {
        const value = event.target.value;

        // Omogućava unos prazne vrednosti dok korisnik kuca
        if (value === "") return;

        // Osigurava da je vrednost unutar dozvoljenog opsega
        const numValue = Number(value);
        if (numValue < minTemp) {
            wantedTempInput.value = minTemp;
        } else if (numValue > maxTemp) {
            wantedTempInput.value = maxTemp;
        }
    });
    const acScheduleInput = document.getElementById("ac-schedule-time");
    const setAcButton = document.getElementById("set-ac-button");
    const resetAcButton = document.getElementById("reset-ac-button");
    const scheduledAcTimeDisplay = document.getElementById("scheduled-ac-time-display");

    let scheduledAcTime = null;
    let acInterval = null; // Za reset tajmera

    // Klik na dugme za zakazivanje
    setAcButton.addEventListener("click", () => {
        const selectedTime = acScheduleInput.value;

        if (!selectedTime) {
            showPopup("Please select a valid time!", "popup-time-kitchen");
            return;
        }

        scheduledAcTime = selectedTime;
        scheduledAcTime = convertTo12HourFormat(scheduledAcTime);
        scheduledAcTimeDisplay.textContent = `Scheduled for: ${scheduledAcTime}`;

        startCheckingAc();
    });

    // Klik na dugme "Reset"
    resetAcButton.addEventListener("click", () => {
        scheduledAcTime = null;
        scheduledAcTimeDisplay.textContent = "No schedule set.";
        clearInterval(acInterval); // Zaustavi proveru ako postoji
    });

    // Funkcija za proveru da li je vreme za uključivanje AC-a
    function startCheckingAc() {
        clearInterval(acInterval); // Osigurava da nema duplih intervala
        acInterval = setInterval(() => {
            const now = new Date();
            const currentTime = now.getHours().toString().padStart(2, "0") + ":" + now.getMinutes().toString().padStart(2, "0");

            if (scheduledAcTime === currentTime) {
                acToggle.checked = true;
                acStatus.textContent = "AC is ON";
                wantedTempInput.disabled = false;
                scheduledAcTime = null; // Resetujemo nakon uključivanja
                scheduledAcTimeDisplay.textContent = "AC turned ON automatically!";
                clearInterval(acInterval); // Stop checking after activation
            }
        }, 1000);
    }

    //LIGHTS KITCHEN
    const mainLightToggle = document.getElementById("ac-toggle-LK1");
    const cabinetLightToggle = document.getElementById("ac-toggle-LK2");

    const mainLightStatus = document.getElementById("ac-status-LK1");
    const cabinetLightStatus = document.getElementById("ac-status-LK2");

    const mainLightIntensity = document.getElementById("light-intensity-LK1");
    const cabinetLightIntensity = document.getElementById("light-intensity-LK2");

    const mainLightValue = document.getElementById("light-value-LK1");
    const cabinetLightValue = document.getElementById("light-value-LK2");

    // Inicijalno onemogućiti slideere jer su svetla isključena
    mainLightIntensity.disabled = true;
    cabinetLightIntensity.disabled = true;

    // Toggle za glavno svetlo
    mainLightToggle.addEventListener("change", () => {
        if (mainLightToggle.checked) {
            mainLightStatus.textContent = "Main light is ON";
            mainLightIntensity.disabled = false; // Omogućavamo klizač
        } else {
            mainLightStatus.textContent = "Main light is OFF";
            mainLightIntensity.disabled = true; // Onemogućavamo klizač
        }
    });

    // Toggle za svetlo ormarića
    cabinetLightToggle.addEventListener("change", () => {
        if (cabinetLightToggle.checked) {
            cabinetLightStatus.textContent = "Kitchen light is ON";
            cabinetLightIntensity.disabled = false; // Omogućavamo klizač
        } else {
            cabinetLightStatus.textContent = "Kitchen light is OFF";
            cabinetLightIntensity.disabled = true; // Onemogućavamo klizač
        }
    });

    // Promena vrednosti klizača za intenzitet glavnog svetla
    mainLightIntensity.addEventListener("input", () => {
        mainLightValue.textContent = mainLightIntensity.value + "%";
    });

    // Promena vrednosti klizača za intenzitet svetla ormarića
    cabinetLightIntensity.addEventListener("input", () => {
        cabinetLightValue.textContent = cabinetLightIntensity.value + "%";
    });
    HomeButtonACK.addEventListener("click", () => {
        ACKPage.classList.add("hidden");
        ACKPage.style.display = "none";
        dashboardPage.classList.remove("hidden");
        dashboardPage.style.display = "flex";
    });
    HomeButtonLK.addEventListener("click", () => {
        LKPage.classList.add("hidden");
        LKPage.style.display = "none";
        dashboardPage.classList.remove("hidden");
        dashboardPage.style.display = "flex";
    });
    HomeButtonOven.addEventListener("click", () => {
        ovenPage.classList.add("hidden");
        ovenPage.style.display = "none";
        dashboardPage.classList.remove("hidden");
        dashboardPage.style.display = "flex";
    });
    HomeButtonProfile.addEventListener("click", () => {
        profilePage.classList.add("hidden");
        profilePage.style.display = "none";
        dashboardPage.classList.remove("hidden");
        dashboardPage.style.display = "flex";
    });


    //oven 

    const progress = document.getElementById("dial-progress");
    const manualInput = document.getElementById("manual-temp");

    let isDragging = false;
    let minTempoven = 0;
    let maxTempoven = 250;

    progress.setAttribute("stroke-dashoffset", "565.48");

    // Then, override the style to ensure it's visually updated
    progress.style.strokeDashoffset = "565.48";

    // Ensure the text and input also reset
    tempDisplay.textContent = "0°";
    manualInput.value = 0;

    
    document.addEventListener("mousedown", (e) => {
        isDragging = true;
        document.addEventListener("mousemove", rotateKnob);
        document.addEventListener("mouseup", () => {
            isDragging = false;
            document.removeEventListener("mousemove", rotateKnob);
        });
    });

    function rotateKnob(event) {
        if (!isDragging) return;

        const rect = progress.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const x = event.clientX - centerX;
        const y = event.clientY - centerY;
        let angle = Math.atan2(y, x) * (180 / Math.PI) + 90;
        if (angle < 0) angle += 360;
        if (angle > 270) return;

        const temperature = Math.round((angle / 270) * (maxTempoven - minTempoven) + minTempoven);
        tempDisplay.textContent = `${temperature}°`;

        progress.style.strokeDashoffset = 565.48 - (angle / 270) * 565.48;
    }

    manualInput.addEventListener("input", function() {
        let temp = parseInt(manualInput.value);
        if (isNaN(temp) || temp < minTempoven) temp = minTempoven;
        if (temp > maxTempoven) temp = maxTempoven;

        const angle = ((temp - minTempoven) / (maxTempoven - minTempoven)) * 270;
        progress.style.strokeDashoffset = 565.48 - (angle / 270) * 565.48;
        tempDisplay.textContent = `${temp}°`;

        // Simulacija da korisnik ne mora da klikne mišem da bi se slajder ažurirao
        isDragging = false;
    });
    //modovi u ovenu
    const modeButtonsList = {
        bothHeaters: document.getElementById("both-heaters"),
        bottomHeater: document.getElementById("bottom-heater"),
        topHeater: document.getElementById("top-heater"),
        defrost: document.getElementById("defrost"),
        fan: document.getElementById("fan"),
        light: document.getElementById("light")
    };

    Object.keys(modeButtonsList).forEach(key => {
        modeButtonsList[key].addEventListener("click", () => {
            if (key === "light" || key === "fan") {
                modeButtonsList[key].classList.toggle("active");
            } else {
                Object.keys(modeButtonsList).forEach(otherKey => {
                    if (otherKey !== "light" && otherKey !== "fan" && otherKey !== key) {
                        modeButtonsList[otherKey].classList.remove("active");
                    }
                });
                modeButtonsList[key].classList.toggle("active");
            }
        });
    });


    //LB

    const mainLightToggleB = document.getElementById("ac-toggle-LB1");
    const makeupLightToggle = document.getElementById("ac-toggle-LB2");

    const mainLightStatusB = document.getElementById("ac-status-LB1");
    const makeupLightStatus = document.getElementById("ac-status-LB2");

    const mainLightIntensityB = document.getElementById("light-intensity-LB1");
    const makeupLightIntensity = document.getElementById("light-intensity-LB2");

    const mainLightValueB = document.getElementById("light-value-LB1");
    const makeupLightValue = document.getElementById("light-value-LB2");

    // Inicijalno onemogućiti slidere jer su svetla isključena
    mainLightIntensityB.disabled = true;
    makeupLightIntensity.disabled = true;

    // Toggle za glavno svetlo
    mainLightToggleB.addEventListener("change", () => {
        if (mainLightToggleB.checked) {
            mainLightStatusB.textContent = "Main light is ON";
            mainLightIntensityB.disabled = false; // Omogućavamo klizač
        } else {
            mainLightStatusB.textContent = "Main light is OFF";
            mainLightIntensityB.disabled = true; // Onemogućavamo klizač
        }
    });

    // Toggle za svetlo ormarića
    makeupLightToggle.addEventListener("change", () => {
        if (makeupLightToggle.checked) {
            makeupLightStatus.textContent = "MakeUp cabinet light is ON";
            makeupLightIntensity.disabled = false; // Omogućavamo klizač
        } else {
            makeupLightStatus.textContent = "MakeUp cabinet light is OFF";
            makeupLightIntensity.disabled = true; // Onemogućavamo klizač
        }
    });

    // Promena vrednosti klizača za intenzitet glavnog svetla
    mainLightIntensityB.addEventListener("input", () => {
        mainLightValueB.textContent = mainLightIntensityB.value + "%";
    });

    // Promena vrednosti klizača za intenzitet svetla ormarića
    makeupLightIntensity.addEventListener("input", () => {
        makeupLightValue.textContent = makeupLightIntensity.value + "%";
    });

    const boilerToggle = document.getElementById("ac-toggle-BB1");
    const boilerStatus = document.getElementById("ac-status-BB1");
    const boilerIntensity = document.getElementById("boiler-intensity-BB1");
    const boilerValue = document.getElementById("boiler-value-BB1");

    const boilerScheduleInput = document.getElementById("boiler-schedule");
    const setBoilerTimeButton = document.getElementById("set-boiler-time");
    const resetBoilerTimeButton = document.getElementById("reset-boiler-time");
    const scheduledTimeDisplay = document.getElementById("scheduled-time-display");

    let scheduledTime = null;
    let scheduleInterval = null; // Da bismo mogli kasnije da zaustavimo interval

    // Inicijalno onemogućiti slider jer je boiler isključen
    boilerIntensity.disabled = true;

    // Toggle za boiler
    boilerToggle.addEventListener("change", () => {
        if (boilerToggle.checked) {
            boilerStatus.textContent = "Boiler is ON";
            boilerIntensity.disabled = false;
        } else {
            boilerStatus.textContent = "Boiler is OFF";
            boilerIntensity.disabled = true;
        }
    });

    // Promena vrednosti klizača za temperaturu
    boilerIntensity.addEventListener("input", () => {
        boilerValue.textContent = boilerIntensity.value + "°C";
    });

    // Podešavanje vremena uključivanja bojlera
    setBoilerTimeButton.addEventListener("click", () => {
        scheduledTime = boilerScheduleInput.value;

        if (!scheduledTime) {
            showPopup("Please select a valid time!", "popup-time-boiler");
            return;
        }
        scheduledTime = convertTo12HourFormat(scheduledTime);
        scheduledTimeDisplay.textContent = `Scheduler for: ${scheduledTime}`;

        // Ako postoji prethodni interval, zaustavi ga
        if (scheduleInterval) {
            clearInterval(scheduleInterval);
        }

        // Provera svakih 30 sekundi da li je vreme za uključivanje bojlera
        scheduleInterval = setInterval(() => {
            let currentTime = new Date();
            let formattedTime = currentTime.toTimeString().slice(0, 5);

            if (formattedTime === scheduledTime && !boilerToggle.checked) {
                boilerToggle.checked = true;
                boilerStatus.textContent = "Boiler is ON";
                boilerIntensity.disabled = false;
                alert("Boiler turned ON automatically!");
                clearInterval(scheduleInterval); // Resetuj interval nakon paljenja
            }
        }, 30000);
    });

    // Resetovanje zakazanog vremena
    resetBoilerTimeButton.addEventListener("click", () => {
        scheduledTime = null;
        scheduledTimeDisplay.textContent = "No schedule set";
        boilerScheduleInput.value = "";

        if (!scheduleInterval) {
            showPopup("Activation time was not set.", "popup-boiler");
        } else if (scheduleInterval) {
            clearInterval(scheduleInterval); // Zaustavi proveru vremena
            scheduleInterval = null;
            showPopup("Scheduled boiler activation has been cancelled.", "popup-boiler");
        }
    });

    //Your Profile 
    const usernameField = document.getElementById("username-field");
    const passwordField = document.getElementById("password-field");
    const currentPasswordContainer = document.getElementById("current-password-container");
    const currentPasswordField = document.getElementById("current-password");

    const editButton = document.getElementById("edit-profile");
    const saveButton = document.getElementById("save-profile");
    const cancelButton = document.getElementById("cancel-profile");

    usernameField.value = loggedInUsername;
    passwordField.value = loggedInPassword;

    let changesMade = false;

    // Ako korisnik menja username ili password, prikaži polje za trenutni password
    usernameField.addEventListener("input", () => {
        changesMade = true;
        currentPasswordContainer.classList.remove("hidden");
    });

    passwordField.addEventListener("input", () => {
        changesMade = true;
        currentPasswordContainer.classList.remove("hidden");
    });

    editButton.addEventListener("click", () => {
        usernameField.disabled = false;
        passwordField.disabled = false;
        currentPasswordField.disabled = false;

        editButton.classList.add("hidden");
        saveButton.classList.remove("hidden");
        cancelButton.classList.remove("hidden");

        changesMade = false; // Resetuj flag kad korisnik klikne Edit
        currentPasswordContainer.classList.add("hidden"); // Sakrij polje za trenutni password
    });

    cancelButton.addEventListener("click", () => {
        usernameField.value = loggedInUsername;
        passwordField.value = loggedInPassword;
        usernameField.disabled = true;
        passwordField.disabled = true;
        currentPasswordField.value = "";

        editButton.classList.remove("hidden");
        saveButton.classList.add("hidden");
        cancelButton.classList.add("hidden");

        currentPasswordContainer.classList.add("hidden"); // Sakrij polje za trenutni password
    });

    saveButton.addEventListener("click", () => {
        if (changesMade) {
            const enteredPassword = currentPasswordField.value.trim();

            if (enteredPassword !== loggedInPassword) {
                showPopup("Incorrect current password! Changes were not saved.", "popup-edit");
                return;
            }

        }

        loggedInUsername = usernameField.value;
        loggedInPassword = passwordField.value;
        const welcomeMessage = document.getElementById("welcome-message");
        welcomeMessage.textContent = `Welcome, ${loggedInUsername}!`;
        localStorage.setItem("username", loggedInUsername);
        localStorage.setItem("password", loggedInPassword);

        usernameField.disabled = true;
        passwordField.disabled = true;
        currentPasswordField.value = "";

        editButton.classList.remove("hidden");
        saveButton.classList.add("hidden");
        cancelButton.classList.add("hidden");

        currentPasswordContainer.classList.add("hidden"); // Sakrij polje za trenutni password

        showPopup("Profile updated successfully!", "popup-save-profile");
    });


    const addRoomPage = document.getElementById("addroompage");
    const addRoomButton = document.querySelector(".grid-item.add"); // Dugme "+"
    const roomField = document.getElementById("room-name");
    addRoomButton.addEventListener("click", () => {
        dashboardPage.classList.add("hidden");
        dashboardPage.style.display = "none";
        addRoomPage.classList.remove("hidden");
        addRoomPage.style.display = "flex";
    });
    const addRoom = document.getElementById("add-room");
    addRoom.addEventListener("click", () => {
        roomField.disabled = false;
    });
    // Pronađi popup elemente
    const popup = document.getElementById("room-added-popup");
    const popupMessage = document.getElementById("popup-message");
    const closePopupButton = document.getElementById("close-popup");

    // Dugme "+" za dodavanje sobe
    addRoomButton.addEventListener("click", () => {
        dashboardPage.classList.add("hidden");
        dashboardPage.style.display = "none";
        addRoomPage.classList.remove("hidden");
        addRoomPage.style.display = "flex";
    });

    // Klik na "Add" dugme
    addRoom.addEventListener("click", () => {
        const roomName = roomField.value.trim();

        // Provjeri da li je uneseno ime sobe
        if (!roomName) {
            showPopup("Please enter a room name!", "popup-no-room-name");
            return;
        }

        // Pronađi sve selektovane uređaje u add-room-grid
        const selectedDevices = Array.from(document.querySelectorAll(".add-room-item.selected"))
            .map(device => device.textContent);

        // Napravi poruku za popup
        let popupText = `Added '${roomName}' room!`;
        if (selectedDevices.length > 0) {
            popupText += `\nDevices: ${selectedDevices.join(", ")}`;
        } else {
            popupText += `\nNo devices selected.`;
        }

        // Prikaz poruke u popupu
        popupMessage.textContent = popupText;
        popup.classList.remove("hidden");
        popup.style.display = "flex";

        // Pronađi grid gde treba da se doda nova soba (glavni grid sa sobama)
        const roomGrid = document.querySelector(".grid");

        if (roomGrid) {
            // Kreiraj novi element sobe
            const roomDiv = document.createElement("div");
            roomDiv.classList.add("grid-item");
            roomDiv.textContent = roomName;

            // Dodaj event listenere za dug pritisak i brisanje
            addDeleteEventListeners(roomDiv);

            // Dodaj sobu pre "Add" dugmeta, ako postoji
            const addButton = document.querySelector(".grid-item.add");
            if (addButton) {
                roomGrid.insertBefore(roomDiv, addButton);
            } else {
                roomGrid.appendChild(roomDiv);
            }
        }

        // Nakon 2 sekunde, zatvori popup i resetuj sve
        setTimeout(() => {
            // Sakrij popup
            popup.classList.add("hidden");
            popup.style.display = "none";

            // Resetuj polje za unos sobe
            roomField.value = "";

            // Resetuj selektovane uređaje u add-room-grid
            document.querySelectorAll(".add-room-item.selected").forEach(element => {
                element.classList.remove("selected");
            });

            // Vrati na dashboard (prikaz glavnog grida sa sobama)
            addRoomPage.classList.add("hidden");
            addRoomPage.style.display = "none";
            dashboardPage.classList.remove("hidden");
            dashboardPage.style.display = "flex";
        }, 2000);
    });

    // Funkcija za dodavanje event listenera za dug pritisak i brisanje
    function addDeleteEventListeners(item) {
        item.addEventListener("mousedown", (e) => {
            if (isPopupOpen) return; // Ako je popup već otvoren, ne radimo ništa

            selectedItem = e.target;
            timer = setTimeout(() => {
                isPopupOpen = true; // Obeležavamo da je popup otvoren
                document.getElementById("delete-popup").style.display = "flex";
            }, longPressTime);
        });

        item.addEventListener("mouseup", () => {
            clearTimeout(timer);
        });

        item.addEventListener("mouseleave", () => {
            clearTimeout(timer);
        });

        item.addEventListener("click", (e) => {
            if (isPopupOpen) {
                e.preventDefault(); // Sprečava ulazak u sobu ako je popup otvoren
                return;
            }
        });
    }

    // Brisanje elementa
    document.getElementById("delete").addEventListener("click", () => {
        console.log("Deleting:", selectedItem);
        if (selectedItem) {
            selectedItem.remove();
            selectedItem = null; // Resetuj selektovani element
        }
        closePopup();
    });

    // Zatvaranje popup-a bez brisanja
    document.getElementById("cancel").addEventListener("click", () => {
        closePopup();
    });

    // Funkcija za zatvaranje popup-a i reset boolean vrednosti
    function closePopup() {
        document.getElementById("delete-popup").style.display = "none";
        isPopupOpen = false;
    }

    // Klik na OK u popupu
    closePopupButton.addEventListener("click", () => {
        popup.classList.add("hidden");
        popup.style.display = "none";

        // Vrati na dashboard
        addRoomPage.classList.add("hidden");
        addRoomPage.style.display = "none";
        dashboardPage.classList.remove("hidden");
        dashboardPage.style.display = "flex";
    });
    const acStatusAlert = document.getElementById("ac-status-alert");
    const ovenStatusAlert = document.getElementById("oven-status-alert");
    const boilerStatusAlert = document.getElementById("boiler-status-alert");
    const lightsStatusAlert = document.getElementById("lights-status-alert");

    // Dugme za otvaranje Alert Page
    checkAlertButton.addEventListener("click", () => {
        updateDeviceStatus(); // Poziva funkciju za ažuriranje statusa

        dashboardPage.classList.add("hidden");
        dashboardPage.style.display = "none";
        alertPage.classList.remove("hidden");
        alertPage.style.display = "flex";
    });

    function updateDeviceStatus() {
        // **1. Air Conditioners**
        let acStatusText = [];
        if (document.getElementById("ac-toggle").checked) {
            acStatusText.push("Kitchen");
        }
        if (document.getElementById("aclr-toggle").checked) {
            acStatusText.push("Living room");
        }
        acStatusAlert.textContent = acStatusText.length > 0 ? `ON in: ${acStatusText.join(", ")}` : "All OFF";

        // **2. Oven**
        let ovenTemperature = document.getElementById("oven-temp-display").textContent;
        if (ovenTemperature > 0) {
            ovenStatusAlert.textContent = `ON - Temperature: ${ovenTemperature}°C`;
        } else {
            ovenStatusAlert.textContent = "OFF";
        }

        // **3. Boiler**
        if (document.getElementById("ac-toggle-BB1").checked) {
            boilerStatusAlert.textContent = `ON - Water Temp: ${document.getElementById("boiler-intensity-BB1").value}°C`;
        } else {
            boilerStatusAlert.textContent = "OFF";
        }

        // **4. Lights**
        let lightsStatusText = [];
        if (document.getElementById("ac-toggle-LK1").checked) lightsStatusText.push("Kitchen Main Light");
        if (document.getElementById("ac-toggle-LK2").checked) lightsStatusText.push("Kitchen Cabinet Light");
        if (document.getElementById("ac-toggle-LB1").checked) lightsStatusText.push("Bathroom Main Light");
        if (document.getElementById("ac-toggle-LB2").checked) lightsStatusText.push("Bathroom Makeup Light");
        if (document.getElementById("ac-toggle-LLR1").checked) lightsStatusText.push("Living room Main Light");
        if (document.getElementById("ac-toggle-LLR2").checked) lightsStatusText.push("Living room Side Light");
        lightsStatusAlert.textContent = lightsStatusText.length > 0 ? `ON: ${lightsStatusText.join(", ")}` : "All OFF";
    }
    // Dugme za zatvaranje Alert Page
    document.querySelector("#alertpage .back-button").addEventListener("click", () => {
        alertPage.classList.add("hidden");
        alertPage.style.display = "none";
        dashboardPage.classList.remove("hidden");
        dashboardPage.style.display = "flex";
    });

    document.querySelector("#addroompage .back-button").addEventListener("click", () => {
        addRoomPage.classList.add("hidden");
        addRoomPage.style.display = "none";
        dashboardPage.classList.remove("hidden");
        dashboardPage.style.display = "flex";
    });

    document.querySelector("#kitchenpage .grid-item:nth-child(4)").addEventListener("click", () => {
        kitchenPage.classList.add("hidden");
        kitchenPage.style.display = "none";
        fridgePage.classList.remove("hidden");
        fridgePage.style.display = "flex";
    });



    const fridgeTempDisplay = document.getElementById("fridge-temp");
    const fridgeTempInput = document.getElementById("fridge-temp-input");
    const setFridgeTempButton = document.getElementById("set-fridge-temp");

    const shoppingItemInput = document.getElementById("shopping-item");
    const addItemButton = document.getElementById("add-item");
    const shoppingList = document.getElementById("shopping-list-items");

    // Postavljanje temperature frižidera
    setFridgeTempButton.addEventListener("click", () => {
        const newTemp = parseInt(fridgeTempInput.value);
        if (newTemp < 1 || newTemp > 10) {
            showPopup("Temperature must be between 1°C and 10°C!", "popup-fridge");
            return;
        }
        fridgeTempDisplay.textContent = `${newTemp}`;
    });

    // Dodavanje artikla u listu
    addItemButton.addEventListener("click", () => {
        const itemName = shoppingItemInput.value.trim();
        if (!itemName) {
            showPopup("Please enter an item!", "popup-fridge");
            return;
        }

        const li = document.createElement("li");
        li.innerHTML = `${itemName} <button class="remove-item">X</button>`;
        shoppingList.appendChild(li);
        shoppingItemInput.value = "";

        // Omogućava brisanje artikla iz liste
        li.querySelector(".remove-item").addEventListener("click", () => {
            li.remove();
        });
    });
    document.querySelector("#fridgepage .back-button").addEventListener("click", () => {
        fridgePage.classList.add("hidden");
        fridgePage.style.display = "none";
        kitchenPage.classList.remove("hidden");
        kitchenPage.style.display = "flex";
    });
    //Dishwasher
    const dishwasherProgramButtons = document.querySelectorAll(".dishwasher-program-btn");
    const selectedDishwasherProgramDisplay = document.getElementById("selected-dishwasher-program");
    const startDishwasherButton = document.getElementById("start-dishwasher");
    const dishwasherStatus = document.getElementById("dishwasher-running");
    const washingStage = document.getElementById("washing-stage");
    const dryingStage = document.getElementById("drying-stage");
    const endStage = document.getElementById("end-stage");

    let selectedDishwasherProgram = null;
    let washingProcess;
    let isRunning = false;

    function resetStages() {
        washingStage.classList.remove("selected");
        dryingStage.classList.remove("selected");
        endStage.classList.remove("selected");
    }

    function resetPrograms() {
        dishwasherProgramButtons.forEach(button => button.classList.remove("active"));
    }

    function disablePrograms(disable) {
        dishwasherProgramButtons.forEach(button => {
            button.disabled = disable;
        });
    }

    dishwasherProgramButtons.forEach(button => {
        button.addEventListener("click", () => {
            if (isRunning) return; // Ne dozvoli promenu programa ako je pokrenut ciklus
            resetPrograms();
            button.classList.add("active");
            selectedDishwasherProgram = button.dataset.program;
            selectedDishwasherProgramDisplay.textContent = selectedDishwasherProgram;
        });
    });

    startDishwasherButton.addEventListener("click", () => {
        if (!selectedDishwasherProgram) {
            showPopup("Please select a program!", "popup-dishwasher");
            return;
        }

        isRunning = true;
        disablePrograms(true);
        dishwasherStatus.textContent = "Washing...";
        startDishwasherButton.disabled = true;
        startDishwasherButton.style.background = "gray";
        resetStages();

        washingStage.classList.add("selected");
        washingProcess = setTimeout(() => {
            washingStage.classList.remove("selected");
            dryingStage.classList.add("selected");
            dishwasherStatus.textContent = "Drying...";
            washingProcess = setTimeout(() => {
                dryingStage.classList.remove("selected");
                endStage.classList.add("selected");
                dishwasherStatus.textContent = "Completed!";
                washingProcess = setTimeout(() => {
                    isRunning = false;
                    disablePrograms(false);
                    startDishwasherButton.disabled = false;
                    startDishwasherButton.style.background = "green";
                    endStage.classList.remove("selected");
                }, 5000);
            }, 5000);
        }, 5000);
    });

    const washingMachinePage = document.getElementById("washingmachinepage");

    const washProgramButtons = document.querySelectorAll(".wash-program-btn");
    const selectedWashProgramDisplay = document.getElementById("selected-wash-program");

    const washingTempInput = document.getElementById("washing-temp");
    const washingTempValueDisplay = document.getElementById("washing-temp-value");
    const washingTempDisplay = document.getElementById("washing-temp-display");

    const startWashButton = document.getElementById("start-wash");
    const washingStatus = document.getElementById("washing-running");

    const backButtonWashing = document.querySelector("#washingmachinepage .back-button");
    const homeButtonWashing = washingMachinePage.querySelector(".icon.home");

    const washingMachineButton = document.querySelector("#bathroompage .grid-item:nth-child(1)");

    let selectedWashProgram = null;

    // Klik na dugme "Washing Machine" u Bathroom
    washingMachineButton.addEventListener("click", () => {
        bathroomPage.classList.add("hidden");
        bathroomPage.style.display = "none";
        washingMachinePage.classList.remove("hidden");
        washingMachinePage.style.display = "flex";
    });

    // Povratak iz Washing Machine-a
    backButtonWashing.addEventListener("click", () => {
        washingMachinePage.classList.add("hidden");
        washingMachinePage.style.display = "none";
        bathroomPage.classList.remove("hidden");
        bathroomPage.style.display = "flex";
    });

    homeButtonWashing.addEventListener("click", () => {
        washingMachinePage.classList.add("hidden");
        washingMachinePage.style.display = "none";
        dashboardPage.classList.remove("hidden");
        dashboardPage.style.display = "flex";
    });

    // Odabir programa pranja
    washProgramButtons.forEach(button => {
        button.addEventListener("click", () => {
            washProgramButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            selectedWashProgram = button.dataset.program;
            selectedWashProgramDisplay.textContent = selectedWashProgram;
        });
    });

    // Podešavanje temperature
    washingTempInput.addEventListener("input", () => {
        let temp = washingTempInput.value;
        washingTempValueDisplay.textContent = `${temp}°C`;
        washingTempDisplay.textContent = `${temp}°C`;
    });

    // Pokretanje mašine za pranje veša
    // Pokretanje mašine za pranje veša
    startWashButton.addEventListener("click", () => {
        if (!selectedWashProgram) {
            showPopup("Please select a wash program!", "popup-washing");
            return;
        }

        // Onemogućavamo dugmad za odabir programa i unos temperature
        washProgramButtons.forEach(button => button.disabled = true);
        washingTempInput.disabled = true;

        washingStatus.textContent = "Running...";
        startWashButton.disabled = true;
        startWashButton.style.background = "gray";

        setTimeout(() => {
            washingStatus.textContent = "Completed!";
            startWashButton.disabled = false;
            startWashButton.style.background = "green";

            // Ponovo omogućavamo dugmad i unos temperature
            washProgramButtons.forEach(button => button.disabled = false);
            washingTempInput.disabled = false;
        }, 5000); // Simulira 5 sekundi pranja
    });









    const washingProgress = document.getElementById("washing-progress");

    startWashButton.addEventListener("click", () => {
        if (!selectedWashProgram) {
            showPopup("Please select a wash program!", "popup-washing-2");
            return;
        }

        washProgramButtons.forEach(button => button.disabled = true);
        washingTempInput.disabled = true;

        washingStatus.textContent = "Running...";
        startWashButton.disabled = true;
        startWashButton.style.background = "gray";

        // Reset progress bara
        washingProgress.value = 0;

        let progress = 0;
        let interval = setInterval(() => {
            if (progress >= 100) {
                clearInterval(interval);
                washingStatus.textContent = "Completed!";
                startWashButton.disabled = false;
                startWashButton.style.background = "green";

                washProgramButtons.forEach(button => button.disabled = false);
                washingTempInput.disabled = false;
            } else {
                progress += 2; // Svakih 100ms se poveća za 2% (ukupno 5 sekundi)
                washingProgress.value = progress;
            }
        }, 100);
    });











    //dryer
    const dryerPage = document.getElementById("dryerpage");

    const dryerProgramButtons = document.querySelectorAll(".dryer-program-btn");
    const selectedDryerProgramDisplay = document.getElementById("selected-dryer-program");

    const dryerTempInput = document.getElementById("dryer-temp");
    const dryerTempValueDisplay = document.getElementById("dryer-temp-value");
    const dryerTempDisplay = document.getElementById("dryer-temp-display");

    const startDryerButton = document.getElementById("start-dryer");
    const dryerStatus = document.getElementById("dryer-running");

    const backButtonDryer = dryerPage.querySelector(".back-button");
    const homeButtonDryer = dryerPage.querySelector(".icon.home");

    const dryerButton = document.querySelector("#bathroompage .grid-item:nth-child(3)");

    let selectedDryerProgram = null;

    // Klik na dugme "Dryer" u Bathroom
    dryerButton.addEventListener("click", () => {
        bathroomPage.classList.add("hidden");
        bathroomPage.style.display = "none";
        dryerPage.classList.remove("hidden");
        dryerPage.style.display = "flex";
    });

    // Povratak iz Dryer-a
    backButtonDryer.addEventListener("click", () => {
        dryerPage.classList.add("hidden");
        dryerPage.style.display = "none";
        bathroomPage.classList.remove("hidden");
        bathroomPage.style.display = "flex";
    });

    homeButtonDryer.addEventListener("click", () => {
        dryerPage.classList.add("hidden");
        dryerPage.style.display = "none";
        dashboardPage.classList.remove("hidden");
        dashboardPage.style.display = "flex";
    });

    // Odabir programa sušenja
    dryerProgramButtons.forEach(button => {
        button.addEventListener("click", () => {
            dryerProgramButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            selectedDryerProgram = button.dataset.program;
            selectedDryerProgramDisplay.textContent = selectedDryerProgram;
        });
    });

    // Podešavanje temperature
    dryerTempInput.addEventListener("input", () => {
        let temp = dryerTempInput.value;
        dryerTempValueDisplay.textContent = `${temp}°C`;
        dryerTempDisplay.textContent = `${temp}°C`;
    });

    // Pokretanje sušilice
    // Pokretanje sušilice
    startDryerButton.addEventListener("click", () => {
        if (!selectedDryerProgram) {
            showPopup("Please select a dryer program!", "popup-dryer");
            return;
        }

        // Onemogućavamo dugmad za odabir programa i unos temperature
        dryerProgramButtons.forEach(button => button.disabled = true);
        dryerTempInput.disabled = true;

        dryerStatus.textContent = "Running...";
        startDryerButton.disabled = true;
        startDryerButton.style.background = "gray";

        setTimeout(() => {
            dryerStatus.textContent = "Completed!";
            startDryerButton.disabled = false;
            startDryerButton.style.background = "green";

            // Ponovo omogućavamo dugmad i unos temperature
            dryerProgramButtons.forEach(button => button.disabled = false);
            dryerTempInput.disabled = false;
        }, 5000); // Simulira 5 sekundi sušenja
    });
    const dryerProgress = document.getElementById("dryer-progress");

    startDryerButton.addEventListener("click", () => {
        if (!selectedDryerProgram) {
            showPopup("Please select a dryer program!", "popup-dryer-2");
            return;
        }

        // Onemogućavamo dugmad za odabir programa i unos temperature
        dryerProgramButtons.forEach(button => button.disabled = true);
        dryerTempInput.disabled = true;

        dryerStatus.textContent = "Running...";
        startDryerButton.disabled = true;
        startDryerButton.style.background = "gray";

        // Resetujemo progress bar
        dryerProgress.value = 0;

        let progress = 0;
        let interval = setInterval(() => {
            if (progress >= 100) {
                clearInterval(interval);
                dryerStatus.textContent = "Completed!";
                startDryerButton.disabled = false;
                startDryerButton.style.background = "green";

                // Ponovo omogućavamo dugmad i unos temperature
                dryerProgramButtons.forEach(button => button.disabled = false);
                dryerTempInput.disabled = false;
            } else {
                progress += 2; // Svakih 100ms se povećava za 2% (5 sekundi ukupno)
                dryerProgress.value = progress;
            }
        }, 100);
    });
    const ironingPage = document.getElementById("ironingstationpage");

    const ironingToggle = document.getElementById("ironing-toggle");
    const ironingStatusDisplay = document.getElementById("ironing-status");

    const backButtonIroning = ironingPage.querySelector(".back-button");
    const homeButtonIroning = ironingPage.querySelector(".icon.home");

    const ironingButton = document.querySelector("#bathroompage .grid-item:nth-child(4)");

    // Klik na dugme "Ironing Station" u Bathroom
    ironingButton.addEventListener("click", () => {
        bathroomPage.classList.add("hidden");
        bathroomPage.style.display = "none";
        ironingPage.classList.remove("hidden");
        ironingPage.style.display = "flex";
    });

    // Povratak iz Ironing Station-a
    backButtonIroning.addEventListener("click", () => {
        ironingPage.classList.add("hidden");
        ironingPage.style.display = "none";
        bathroomPage.classList.remove("hidden");
        bathroomPage.style.display = "flex";
    });

    homeButtonIroning.addEventListener("click", () => {
        ironingPage.classList.add("hidden");
        ironingPage.style.display = "none";
        dashboardPage.classList.remove("hidden");
        dashboardPage.style.display = "flex";
    });

    // Uključivanje/isključivanje Ironing Station-a
    ironingToggle.addEventListener("change", () => {
        if (ironingToggle.checked) {
            ironingStatusDisplay.textContent = "ON";
        } else {
            ironingStatusDisplay.textContent = "OFF";
        }
    });

    document.querySelectorAll(".grid-item").forEach(item => {
        item.addEventListener("mousedown", (e) => {
            if (isPopupOpen) return; // Ako je popup već otvoren, ne radimo ništa

            selectedItem = e.target;
            timer = setTimeout(() => {
                isPopupOpen = true; // Obeležavamo da je popup otvoren
                document.getElementById("delete-popup").style.display = "flex";
            }, longPressTime);
        });

        item.addEventListener("mouseup", () => {
            clearTimeout(timer);
        });

        item.addEventListener("mouseleave", () => {
            clearTimeout(timer);
        });

        item.addEventListener("click", (e) => {
            if (isPopupOpen) {
                e.preventDefault(); // Sprečava ulazak u sobu ako je popup otvoren
                return;
            }
        });
    });

    // Brisanje elementa
    document.getElementById("delete").addEventListener("click", () => {
        console.log("Deleting:", selectedItem);
        if (selectedItem) {
            selectedItem.remove();
            selectedItem = null; // Resetuj selektovani element
        }
        closePopup();
    });

    // Zatvaranje popup-a bez brisanja
    document.getElementById("cancel").addEventListener("click", () => {
        closePopup();
    });

    // Funkcija za zatvaranje popup-a i reset boolean vrednosti
    function closePopup() {
        document.getElementById("delete-popup").style.display = "none";
        isPopupOpen = false;
    }


    //ACLR
    let wantedTempLR = 15;
    const wantedTempInputLR = document.getElementById("wanted-temp-lr");
    const aclrToggle = document.getElementById("aclr-toggle");
    const aclrStatus = document.getElementById("aclr-status");

    // Inicijalno onemogućiti unos temperature jer je AC isključen
    wantedTempInputLR.value = wantedTempLR;
    wantedTempInputLR.disabled = true;

    // Funkcija za toggle dugme
    aclrToggle.addEventListener("change", () => {
        if (aclrToggle.checked) {
            aclrStatus.textContent = "AC is ON";
            wantedTempInputLR.disabled = false;
        } else {
            aclrStatus.textContent = "AC is OFF";
            wantedTempInputLR.disabled = true;
        }
    });

    // Ručni unos temperature sa validacijom
    wantedTempInputLR.addEventListener("input", () => {
        let newTempLR = parseInt(wantedTempInputLR.value);

        if (isNaN(newTempLR) || newTempLR < minTemp) {
            wantedTempInputLR.value = minTemp;
        } else if (newTempLR > maxTemp) {
            wantedTempInputLR.value = maxTemp;
        } else {
            wantedTempLR = newTempLR;
        }
    });
    const acScheduleInputLR = document.getElementById("ac-schedule-time-aclr");
    const setAcButtonLR = document.getElementById("set-ac-button-aclr");
    const resetAcButtonLR = document.getElementById("reset-ac-button-aclr");
    const scheduledAcTimeDisplayLR = document.getElementById("scheduled-ac-time-display-aclr");

    let scheduledAcTimeLR = null;
    let acIntervalLR = null; // Za reset tajmera

    // Klik na dugme za zakazivanje
    setAcButtonLR.addEventListener("click", () => {
        const selectedTime = acScheduleInputLR.value;

        if (!selectedTime) {
            showPopup("Please select a valid time!", "popup-time-living-room");
            return;
        }

        scheduledAcTimeLR = selectedTime;
        scheduledAcTimeLR = convertTo12HourFormat(scheduledAcTimeLR);
        scheduledAcTimeDisplayLR.textContent = `Scheduled for: ${scheduledAcTimeLR}`;

        startCheckingAcLR();
    });

    // Klik na dugme "Reset"
    resetAcButtonLR.addEventListener("click", () => {
        scheduledAcTimeLR = null;
        scheduledAcTimeDisplayLR.textContent = "No schedule set.";
        clearInterval(acIntervalLR); // Zaustavi proveru ako postoji
    });

    // Funkcija za proveru da li je vreme za uključivanje AC-a
    function startCheckingAcLR() {
        clearInterval(acIntervalLR); // Osigurava da nema duplih intervala
        acIntervaLR = setInterval(() => {
            const now = new Date();
            const currentTime = now.getHours().toString().padStart(2, "0") + ":" + now.getMinutes().toString().padStart(2, "0");

            if (scheduledAcTimeLR === currentTime) {
                acToggle.checked = true;
                acStatus.textContent = "AC is ON";
                wantedTempInput.disabled = false;
                scheduledAcTimeLR = null; // Resetujemo nakon uključivanja
                scheduledAcTimeDisplayLR.textContent = "AC turned ON automatically!";
                clearInterval(acInterval); // Stop checking after activation
            }
        }, 1000);
    }

    //LIGHTS KITCHEN
    const mainLightToggleLLR = document.getElementById("ac-toggle-LLR1");
    const sideLightToggle = document.getElementById("ac-toggle-LLR2");

    const mainLightStatusLLR = document.getElementById("ac-status-LLR1");
    const sideLightStatus = document.getElementById("ac-status-LLR2");

    const mainLightIntensityLLR = document.getElementById("light-intensity-LLR1");
    const sideLightIntensity = document.getElementById("light-intensity-LLR2");

    const mainLightValueLLR = document.getElementById("light-value-LLR1");
    const sideLightValue = document.getElementById("light-value-LLR2");

    // Inicijalno onemogućiti slideere jer su svetla isključena
    mainLightIntensityLLR.disabled = true;
    sideLightIntensity.disabled = true;

    // Toggle za glavno svetlo
    mainLightToggleLLR.addEventListener("change", () => {
        if (mainLightToggleLLR.checked) {
            mainLightStatusLLR.textContent = "Main light is ON";
            mainLightIntensityLLR.disabled = false; // Omogućavamo klizač
        } else {
            mainLightStatusLLR.textContent = "Main light is OFF";
            mainLightIntensityLLR.disabled = true; // Onemogućavamo klizač
        }
    });

    // Toggle za svetlo ormarića
    sideLightToggle.addEventListener("change", () => {
        if (sideLightToggle.checked) {
            sideLightStatus.textContent = "Side light is ON";
            sideLightIntensity.disabled = false; // Omogućavamo klizač
        } else {
            sideLightStatus.textContent = "Side light is OFF";
            sideLightIntensity.disabled = true; // Onemogućavamo klizač
        }
    });

    // Promena vrednosti klizača za intenzitet glavnog svetla
    mainLightIntensityLLR.addEventListener("input", () => {
        mainLightValueLLR.textContent = mainLightIntensityLLR.value + "%";
    });

    // Promena vrednosti klizača za intenzitet svetla ormarića
    sideLightIntensity.addEventListener("input", () => {
        sideLightValue.textContent = sideLightIntensity.value + "%";
    });


    //Cat feeder scheduler
    const acScheduleInputcf = document.getElementById("ac-schedule-time-cf");
    const setAcButtoncf = document.getElementById("set-ac-button-cf");
    const resetAcButtoncf = document.getElementById("reset-ac-button-cf");
    const scheduledAcTimeDisplaycf = document.getElementById("scheduled-ac-time-display-cf");
    const catImage = document.getElementById("cat-image");
    let scheduledAcTimecf = null;
    let acIntervalcf = null; // Za reset tajmera

    // Klik na dugme za zakazivanje
    setAcButtoncf.addEventListener("click", () => {
        const selectedTime = acScheduleInputcf.value;

        if (!selectedTime) {
            showPopup("Please select a valid time!", "popup-time-cat-feeder");
            return;
        }

        scheduledAcTimecf = selectedTime;
        scheduledAcTimecf = convertTo12HourFormat(scheduledAcTimecf);
        scheduledAcTimeDisplaycf.textContent = `Scheduled for: ${scheduledAcTimecf}`;
        catImage.classList.add("hidden");
        startCheckingAccf();
    });

    // Klik na dugme "Reset"
    resetAcButtoncf.addEventListener("click", () => {
        scheduledAcTimecf = null;
        scheduledAcTimeDisplaycf.textContent = "No schedule set.";
        clearInterval(acIntervalcf); // Zaustavi proveru ako postoji
        catImage.classList.remove("hidden"); // Prikazi sliku
    });

    // Funkcija za proveru da li je vreme za uključivanje AC-a
    function startCheckingAccf() {
        clearInterval(acInterval); // Osigurava da nema duplih intervala
        acIntervalcf = setInterval(() => {
            const now = new Date();
            const currentTime = now.getHours().toString().padStart(2, "0") + ":" + now.getMinutes().toString().padStart(2, "0");

            if (scheduledAcTimecf === currentTime) {
                acToggle.checked = true;
                acStatus.textContent = "Cat Feeder is activated.";

                scheduledAcTimecf = null; // Resetujemo nakon uključivanja
                scheduledAcTimeDisplaycf.textContent = "Cat Feeder is turned ON automatically!";
                clearInterval(acIntervalcf); // Stop checking after activation
            }
        }, 1000);
    }

    

    function updateLivingRoomInfo() {
        const roomTempDisplay = document.getElementById("lr-room-temp");
        const acStatusDisplay = document.getElementById("lr-ac-status");
        const lightsStatusDisplay = document.getElementById("lr-lights-status");

        // Provera da li elementi postoje pre nego što ih ažuriramo
        if (!roomTempDisplay || !acStatusDisplay || !lightsStatusDisplay) return;

        // Dohvatanje stvarnih vrednosti
        let roomTemperature = document.getElementById("current-temp")?.textContent || "N/A";
        let acIsOn = document.getElementById("aclr-toggle")?.checked ? "on" : "off";
        let lightsAreOn = document.getElementById("ac-toggle-LLR1")?.checked || document.getElementById("ac-toggle-LLR2")?.checked ? "on" : "off";


        // Ažuriranje prikaza
        roomTempDisplay.innerHTML = `Room temperature: ${roomTemperature}°`;
        acStatusDisplay.innerHTML = `Air conditioner is ${acIsOn}.`;
        lightsStatusDisplay.innerHTML = `Lights are ${lightsAreOn}.`;
    }

    // Event listeneri za dinamično ažuriranje
    document.getElementById("aclr-toggle")?.addEventListener("change", updateLivingRoomInfo);
    document.getElementById("ac-toggle-LLR1")?.addEventListener("change", updateLivingRoomInfo);
    document.getElementById("ac-toggle-LLR2")?.addEventListener("change", updateLivingRoomInfo);

    // Pokretanje na učitavanju stranice
    document.addEventListener("DOMContentLoaded", updateLivingRoomInfo);


    //UPDATE BATHROOM


    function updateBathroomInfo() {
        const roomTempDisplay = document.getElementById("b-room-temp");
        const acStatusDisplay = document.getElementById("b-b-status");
        const lightsStatusDisplay = document.getElementById("b-lights-status");
        const ironStatusDisplay = document.getElementById("b-i-status");
        const washerStatusDisplay = document.getElementById("b-w-status");
        // Provera da li elementi postoje pre nego što ih ažuriramo
        if (!roomTempDisplay || !acStatusDisplay || !lightsStatusDisplay || !ironStatusDisplay || !washerStatusDisplay) return;
        let washerIsOn = "off"; // Početno stanje

        if (washingStatus.textContent == "Running...") {
            washerIsOn = "on";
        }


        // Dohvatanje stvarnih vrednosti
        let roomTemperature = document.getElementById("current-temp")?.textContent || "N/A";
        let acIsOn = document.getElementById("ac-toggle-BB1")?.checked ? "on" : "off";
        let lightsAreOn = document.getElementById("ac-toggle-LB1")?.checked || document.getElementById("ac-toggle-LB2")?.checked ? "on" : "off";
        let ironIsOn = document.getElementById("ironing-toggle")?.checked ? "on" : "off";

        // Ažuriranje prikaza
        roomTempDisplay.innerHTML = `Room temperature: ${roomTemperature}°`;
        acStatusDisplay.innerHTML = `Boiler is ${acIsOn}.`;
        lightsStatusDisplay.innerHTML = `Lights are ${lightsAreOn}.`;
        ironStatusDisplay.innerHTML = `Iron is ${ironIsOn}.`;
        washerStatusDisplay.innerHTML = `Washer is ${washerIsOn}.`;
    }

    // Event listeneri za dinamično ažuriranje
    document.getElementById("ac-toggle-BB1")?.addEventListener("change", updateBathroomInfo);
    document.getElementById("ac-toggle-LB1")?.addEventListener("change", updateBathroomInfo);
    document.getElementById("ac-toggle-LB2")?.addEventListener("change", updateBathroomInfo);
    document.getElementById("ironing-toggle")?.addEventListener("change", updateBathroomInfo);
    document.getElementById("washing-Status")?.addEventListener("change", updateBathroomInfo);
    // Pokretanje na učitavanju stranice
    document.addEventListener("DOMContentLoaded", updateBathroomInfo);



    //UPDATE BATHROOM

    //update kitchen



    function updateKitchenInfo() {
        const roomTempDisplay = document.getElementById("k-room-temp");
        const acStatusDisplay = document.getElementById("k-b-status");
        const lightsStatusDisplay = document.getElementById("k-lights-status");
        const fridgeTempDisplay = document.getElementById("k-fridge-temp");
        const dishwasherStatusDisplay = document.getElementById("k-dish");
        // Provera da li elementi postoje pre nego što ih ažuriramo
        if (!roomTempDisplay || !acStatusDisplay || !lightsStatusDisplay) return;


        // Dohvatanje stvarnih vrednosti
        let roomTemperature = document.getElementById("current-temp")?.textContent || "N/A";
        let acIsOn = document.getElementById("ac-toggle")?.checked ? "on" : "off";
        let lightsAreOn = document.getElementById("ac-toggle-LK1")?.checked || document.getElementById("ac-toggle-LK2")?.checked ? "on" : "off";
        let fridgeTemperature = document.getElementById("fridge-temp")?.textContent || "4°C";
        let dishwasherState = dishwasherStatus.textContent || "off";

        // Ažuriranje prikaza
        roomTempDisplay.innerHTML = `Room temperature: ${roomTemperature}°`;
        acStatusDisplay.innerHTML = `AC is ${acIsOn}.`;
        lightsStatusDisplay.innerHTML = `Lights are ${lightsAreOn}.`;
        fridgeTempDisplay.innerHTML = `Fridge temperature: ${fridgeTemperature}°`;
        dishwasherStatusDisplay.innerHTML = `Dishwasher is ${dishwasherState}.`;
    }
    document.getElementById("set-fridge-temp")?.addEventListener("click", () => {
        const fridgeTempDisplay = document.getElementById("fridge-temp");
        const fridgeTempInput = document.getElementById("fridge-temp-input");

        const newTemp = parseInt(fridgeTempInput.value);
        if (newTemp < 1 || newTemp > 10) {
            showPopup("Temperature must be between 1°C and 10°C!", "popup-fridge");
            return;
        }
        fridgeTempDisplay.textContent = `${newTemp}`;
        updateKitchenInfo(); // Osigurava da se ažurira prikaz u kuhinji
    });
    // Event listeneri za dinamično ažuriranje
    document.getElementById("ac-toggle")?.addEventListener("change", updateKitchenInfo);
    document.getElementById("ac-toggle-LK1")?.addEventListener("change", updateKitchenInfo);
    document.getElementById("ac-toggle-LK2")?.addEventListener("change", updateKitchenInfo);

    // Pokretanje na učitavanju stranice
    document.addEventListener("DOMContentLoaded", updateKitchenInfo);

    //update kitchen

    /*Smart Scheduler*/

    const scheduleTimeInput = document.getElementById("schedule-time");
    const deviceSelection = document.getElementById("device-selection");
    const repeatOption = document.getElementById("repeat-option");
    const weeklyOptions = document.getElementById("weekly-options");
    const monthlyOptions = document.getElementById("monthly-options");
    const dayOfWeekSelect = document.getElementById("day-of-week");
    const dayOfMonthInput = document.getElementById("day-of-month");
    const setScheduleButton = document.getElementById("set-schedule");
    const scheduledDevicesList = document.getElementById("scheduled-devices-list");

    const boilerScheduleDisplay = document.getElementById("scheduled-time-display");
    const aclrScheduleDisplay = document.getElementById("scheduled-ac-time-display-aclr");
    const ackScheduleDisplay = document.getElementById("scheduled-ac-time-display");
    const catfeederScheduleDisplay = document.getElementById("scheduled-catfeeder-time-display");

    repeatOption.addEventListener("change", () => {
        weeklyOptions.classList.add("hidden");
        monthlyOptions.classList.add("hidden");
        if (repeatOption.value === "weekly") {
            weeklyOptions.classList.remove("hidden");
        } else if (repeatOption.value === "monthly") {
            monthlyOptions.classList.remove("hidden");
        }
    });

    setScheduleButton.addEventListener("click", () => {
        const selectedTime = scheduleTimeInput.value;
        
        const selectedDevice = deviceSelection.value;
        const repeatType = repeatOption.value;
        let repeatDetails = "";

        if (!selectedTime) {
            showPopup("Please select a valid time!", "popup-time");
            return;
        }

        if (repeatType === "weekly") {
            repeatDetails = `every ${dayOfWeekSelect.value}`;
        } else if (repeatType === "monthly") {
            repeatDetails = `on the ${dayOfMonthInput.value} of each month`;
        }

        const scheduledItem = document.createElement("li");
        scheduledItem.innerHTML = `${selectedDevice} at ${selectedTime} ${repeatDetails} <button class='remove-schedule'>X</button>`;
        scheduledDevicesList.appendChild(scheduledItem);

        scheduledItem.querySelector(".remove-schedule").addEventListener("click", () => {
            scheduledItem.remove();
            if (selectedDevice === "Boiler") boilerScheduleDisplay.textContent = "No schedule set.";
            if (selectedDevice === "Air Conditioner - Kitchen") ackScheduleDisplay.textContent = "No schedule set.";
            if (selectedDevice === "Air Conditioner - Living Room") aclrScheduleDisplay.textContent = "No schedule set.";
            if (selectedDevice === "Cat Feeder") catfeederScheduleDisplay.textContent = "No schedule set.";
        });

        showPopup(`Scheduled ${selectedDevice} at ${selectedTime} ${repeatDetails}`, "popup-scheduler");

        scheduleTimeInput.value = "";

        // Update respective device schedule display
        if (selectedDevice === "Boiler") boilerScheduleDisplay.textContent = `Scheduled for: ${selectedTime} ${repeatDetails}`;
        if (selectedDevice === "Air Conditioner - Kitchen") ackScheduleDisplay.textContent = `Scheduled for: ${selectedTime} ${repeatDetails}`;
        if (selectedDevice === "Air Conditioner - Living Room") aclrScheduleDisplay.textContent = `Scheduled for: ${selectedTime} ${repeatDetails}`;
        if (selectedDevice === "Cat Feeder") catfeederScheduleDisplay.textContent = `Scheduled for: ${selectedTime} ${repeatDetails}`;
    });

    const dialPage = document.getElementById("dialpage");
    const dialButton = document.getElementById("dial-button");

    // Emergency buttons
    const callPolice = document.getElementById("call-police");
    const callAmbulance = document.getElementById("call-ambulance");
    const callFire = document.getElementById("call-fire");
    const callContact = document.getElementById("call-contact");

    // Bank button
    const bankButton = document.getElementById("bank-button");

    
    function showPopup2(message, popupId, onConfirm) {
        const popupOverlay = document.getElementById(popupId);
        if (!popupOverlay) {
            console.error(`Popup with ID "${popupId}" not found.`);
            return;
        }
        const popupMessage = popupOverlay.querySelector(".popup-message");
        const yesButton = popupOverlay.querySelector(".popup-yes");
        const noButton = popupOverlay.querySelector(".popup-no");

        if (!popupMessage || !yesButton || !noButton) {
            console.error(`Popup structure incorrect in "${popupId}".`);
            return;
        }

        popupMessage.textContent = message;
        popupOverlay.style.display = "flex";

        yesButton.addEventListener("click", () => {
            popupOverlay.style.display = "none";
            if (onConfirm && typeof onConfirm === "function") {
                onConfirm();
            }
        }, { once: true });

        noButton.addEventListener("click", () => {
            popupOverlay.style.display = "none";
        }, { once: true });
    }
    // Klik na ikonicu telefona otvara dialpage
    dialButton.addEventListener("click", () => {
        dashboardPage.classList.add("hidden");
        dashboardPage.style.display = "none";
        dialPage.classList.remove("hidden");
        dialPage.style.display = "flex";
    });

    callPolice.addEventListener("click", () => {
        showPopup2("Do you want to call the police (122)?", "popup-police", () => {
            window.location.href = "tel:122";
        });
    });


    callAmbulance.addEventListener("click", () => {
            showPopup2("Do you want to call an ambulance (124)?","popup-amb", () => {
             window.location.href = "tel:124";
        });
    });

    callFire.addEventListener("click", () => {
            showPopup2("Do you want to call fire fighters (123)?","popup-fire", () => {
             window.location.href = "tel:123";
        });
    });

    callContact.addEventListener("click", () => {
            showPopup2("Do you want to call your emergency contact (+38761000000)?","popup-call", () => {
             window.location.href = "tel:+38761000000";
        });
    });

    bankButton.addEventListener("click", () => {
            showPopup2("Do you want to open you bank-app?","popup-bank", () => {
             window.location.href = "bankapp://";
        });
    });

    //LIGHTS KITCHEN
    const mainLightToggleLBR = document.getElementById("ac-toggle-LBR1");
    const sideLightToggleBR = document.getElementById("ac-toggle-LBR2");

    const mainLightStatusLBR = document.getElementById("ac-status-LBR1");
    const sideLightStatusBR = document.getElementById("ac-status-LBR2");

    const mainLightIntensityLBR = document.getElementById("light-intensity-LBR1");
    const sideLightIntensityBR = document.getElementById("light-intensity-LBR2");

    const mainLightValueLBR = document.getElementById("light-value-LBR1");
    const sideLightValueBR = document.getElementById("light-value-LBR2");

    // Inicijalno onemogućiti slideere jer su svetla isključena
    mainLightIntensityLBR.disabled = true;
    sideLightIntensityBR.disabled = true;

    // Toggle za glavno svetlo
    mainLightToggleLBR.addEventListener("change", () => {
        if (mainLightToggleLBR.checked) {
            mainLightStatusLBR.textContent = "Main light is ON";
            mainLightIntensityLBR.disabled = false; // Omogućavamo klizač
        } else {
            mainLightStatusLBR.textContent = "Main light is OFF";
            mainLightIntensityLBR.disabled = true; // Onemogućavamo klizač
        }
    });

    // Toggle za svetlo ormarića
    sideLightToggleBR.addEventListener("change", () => {
        if (sideLightToggleBR.checked) {
            sideLightStatusBR.textContent = "Bedside light is ON";
            sideLightIntensityBR.disabled = false; // Omogućavamo klizač
        } else {
            sideLightStatusBR.textContent = "Bedside light is OFF";
            sideLightIntensityBR.disabled = true; // Onemogućavamo klizač
        }
    });

    // Promena vrednosti klizača za intenzitet glavnog svetla
    mainLightIntensityLBR.addEventListener("input", () => {
        mainLightValueLBR.textContent = mainLightIntensityLBR.value + "%";
    });

    // Promena vrednosti klizača za intenzitet svetla ormarića
    sideLightIntensityBR.addEventListener("input", () => {
        sideLightValueBR.textContent = sideLightIntensityBR.value + "%";
    });

    //Cat feeder scheduler
    const acScheduleInputr = document.getElementById("ac-schedule-time-r");
    const setAcButtonr = document.getElementById("set-ac-button-r");
    const resetAcButtonr = document.getElementById("reset-ac-button-r");
    const scheduledAcTimeDisplayr = document.getElementById("scheduled-ac-time-display-r");
    
    let scheduledAcTimer = null;
    let acIntervalr = null; // Za reset tajmera

    // Klik na dugme za zakazivanje
    setAcButtonr.addEventListener("click", () => {
        const selectedTime = acScheduleInputr.value;

        if (!selectedTime) {
            showPopup("Please select a valid time!", "popup-time-cat-feeder");
            return;
        }

        scheduledAcTimecf = selectedTime;
        scheduledAcTimecf = convertTo12HourFormat(scheduledAcTimecf);
        scheduledAcTimeDisplaycf.textContent = `Scheduled for: ${scheduledAcTimecf}`;
        catImage.classList.add("hidden");
        startCheckingAccf();
    });

    // Klik na dugme "Reset"
    resetAcButtoncf.addEventListener("click", () => {
        scheduledAcTimecf = null;
        scheduledAcTimeDisplaycf.textContent = "No schedule set.";
        clearInterval(acIntervalcf); // Zaustavi proveru ako postoji
        catImage.classList.remove("hidden"); // Prikazi sliku
    });

    // Funkcija za proveru da li je vreme za uključivanje AC-a
    function startCheckingAccf() {
        clearInterval(acInterval); // Osigurava da nema duplih intervala
        acIntervalcf = setInterval(() => {
            const now = new Date();
            const currentTime = now.getHours().toString().padStart(2, "0") + ":" + now.getMinutes().toString().padStart(2, "0");

            if (scheduledAcTimecf === currentTime) {
                acToggle.checked = true;
                acStatus.textContent = "Cat Feeder is activated.";

                scheduledAcTimecf = null; // Resetujemo nakon uključivanja
                scheduledAcTimeDisplaycf.textContent = "Cat Feeder is turned ON automatically!";
                clearInterval(acIntervalcf); // Stop checking after activation
            }
        }, 1000);
    }
    
});