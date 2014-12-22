angular.module('partials', ['app/site/partials/home.html', 'app/reminders/partials/privacy.html', 'app/reminders/partials/reminder/reminder.list.template.html', 'app/reminders/partials/reminder/reminders.create.html', 'app/reminders/partials/reminder/reminders.html', 'app/reminders/partials/reminder/reminders.list.html', 'app/reminders/partials/reminderModal/reminderDeleteModal.html', 'app/reminders/partials/reminderModal/reminderModal.html', 'app/feedback/partials/feedbackModal/feedbackModal.html', 'app/account/partials/account.html', 'app/account/partials/logout.html', 'app/account/partials/profile.html', 'app/account/partials/signup_confirm_abstract.html', 'app/account/partials/signup_confirm_invalid.html', 'app/account/partials/signup_confirm_valid.html', 'app/account/partials/validate_password_reset_token.html', 'app/account/partials/validate_password_reset_token_abstract.html', 'app/account/partials/validate_password_reset_token_invalid.html', 'app/account/partials/validate_password_reset_token_valid.html', 'app/common/partials/emailList/emailList.html', 'app/common/partials/header.html', 'app/common/partials/timepickerPopup/timepickerPopup.html', 'template/datepicker/datepicker.html', 'template/datepicker/popup.html', 'template/modal/backdrop.html', 'template/modal/window.html', 'template/popover/popover.html', 'template/tabs/tab.html', 'template/tabs/tabset.html', 'template/tooltip/tooltip-html-unsafe-popup.html', 'template/tooltip/tooltip-popup.html']);

angular.module("app/site/partials/home.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/site/partials/home.html",
    "<div header></div>\n" +
    "\n" +
    "Welcome to the home page!\n" +
    "");
}]);

angular.module("app/reminders/partials/privacy.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/reminders/partials/privacy.html",
    "<div class=\"privacy-container\">\n" +
    "\n" +
    "    <h1>Terms and Privacy Policy</h1>\n" +
    "\n" +
    "    <div>\n" +
    "        <section>\n" +
    "            <h3>General Terms</h3>\n" +
    "            <ul>\n" +
    "                <li>\n" +
    "                    Reme.IO is a tool created in the sole purpose of helping people get organized by creating\n" +
    "                    reminders which will be sent to the provided e-mail address(es) at a specific date and time.\n" +
    "                    Reme.IO is not responsible for the content entered by the user.\n" +
    "                </li>\n" +
    "                <li>\n" +
    "                    Reme.IO uses e-mail as the only notification method. Reme.IO is not responsible for missed\n" +
    "                    dead-lines, appointments or other time-critical events.\n" +
    "                </li>\n" +
    "            </ul>\n" +
    "        </section>\n" +
    "\n" +
    "        <section>\n" +
    "            <h3>Privacy Policy</h3>\n" +
    "            <ul>\n" +
    "                <li>\n" +
    "                    The information Reme.IO stores is the subject of the reminder and the e-mail address(es)\n" +
    "                    the user enters for the reminder recipient.\n" +
    "                </li>\n" +
    "                <li>\n" +
    "                    We use local storage to save reminder related data for better user-experience. We do not\n" +
    "                    collect anonymous data of any kind.\n" +
    "                </li>\n" +
    "                <li>\n" +
    "                    The only e-mail Reme.IO will send to the provided address(es) will be the reminder which\n" +
    "                    the user creates.\n" +
    "                </li>\n" +
    "                <li>\n" +
    "                    We will not use your e-mail address to send any newsletters, advertising or any other kind\n" +
    "                    of spam.\n" +
    "                </li>\n" +
    "                <li>\n" +
    "                    We will not share your e-mail address with 3rd party entities.\n" +
    "                </li>\n" +
    "            </ul>\n" +
    "        </section>\n" +
    "\n" +
    "        <section>\n" +
    "            <div>\n" +
    "                Please feel free to contact us at <a href=\"mailto:hello@reme.io\">hello@reme.io</a> for any\n" +
    "                questions or concerns you may have regarding the privacy policy.\n" +
    "            </div>\n" +
    "        </section>\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "");
}]);

angular.module("app/reminders/partials/reminder/reminder.list.template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/reminders/partials/reminder/reminder.list.template.html",
    "<!--Reminder list is empty-->\n" +
    "<span ng-if=\"reminders.length === 0\">You don't have any reminders defined.</span>\n" +
    "\n" +
    "<!--Reminder list-->\n" +
    "<div class=\"reminder\" ng-repeat=\"reminder in reminders | orderObjectBy : 'dueOn' : true\">\n" +
    "    <div class=\"reminder__title\">\n" +
    "        {{reminder.model.text}}\n" +
    "    </div>\n" +
    "    <div class=\"reminder__info\">\n" +
    "        <div class=\"reminder__info__item reminder__info__item--date\">\n" +
    "            <span class=\"icon-calendar\"></span>\n" +
    "            {{reminder.model.dueOn | friendlyDate}}\n" +
    "        </div>\n" +
    "        <div class=\"reminder__info__item reminder__info__item--recurring\">\n" +
    "            <span class=\"icon-recurring\"></span>\n" +
    "            Every week on Monday\n" +
    "        </div>\n" +
    "        <div class=\"reminder__info__item reminder__info__item--time\">\n" +
    "            <span class=\"icon-clock\"></span>\n" +
    "            {{reminder.model.dueOn | friendlyHour}}\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"reminder__menu\">\n" +
    "        <a class=\"reminder__menu__option\" href=\"#\" ng-click=\"onUpdate({reminder: reminder})\"><span\n" +
    "                class=\"icon-pencil\"></span></a>\n" +
    "        <a class=\"reminder__menu__option reminder__menu__option--complete\" href=\"#\"><span\n" +
    "                class=\"icon-checkmark\"></span></a>\n" +
    "        <a class=\"reminder__menu__option\" href=\"#\" ng-click=\"onDelete({reminder: reminder})\"><span\n" +
    "                class=\"icon-trash\"></span></a>\n" +
    "    </div>\n" +
    "\n" +
    "</div>");
}]);

angular.module("app/reminders/partials/reminder/reminders.create.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/reminders/partials/reminder/reminders.create.html",
    "<div class=\"reminders__header\">\n" +
    "    <a class=\"btn-outline reminders__header__btn\" href=\"#\" ng-click=\"openReminderModalService()\">Create reminder</a>\n" +
    "</div>");
}]);

angular.module("app/reminders/partials/reminder/reminders.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/reminders/partials/reminder/reminders.html",
    "<div header></div>\n" +
    "\n" +
    "<div ui-view=\"create\"></div>\n" +
    "\n" +
    "<div ui-view=\"list\"></div>");
}]);

angular.module("app/reminders/partials/reminder/reminders.list.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/reminders/partials/reminder/reminders.list.html",
    "<div class=\"centered-global-width\">\n" +
    "\n" +
    "    <!-- Subscribe to success flash messages. -->\n" +
    "    <div flash-alert=\"success\" active-class=\"in\" class=\"alert fade\">\n" +
    "        <strong class=\"alert-heading\">Congrats!</strong>\n" +
    "        <span class=\"alert-message\">{{flash.message}}</span>\n" +
    "    </div>\n" +
    "\n" +
    "    <tabset>\n" +
    "        <tab heading=\"Upcoming reminders\">\n" +
    "            <div reminder-list reminders=\"upcomingReminders\" on-update=\"openUpdateReminderModalService(reminder)\"\n" +
    "                 on-delete=\"openDeleteReminderModalService(reminder)\"></div>\n" +
    "        </tab>\n" +
    "\n" +
    "        <tab heading=\"Past reminders\">\n" +
    "            <div reminder-list reminders=\"pastReminders\" on-update=\"openUpdateReminderModalService(reminder)\"\n" +
    "                 on-delete=\"openDeleteReminderModalService(reminder)\"></div>\n" +
    "        </tab>\n" +
    "    </tabset>\n" +
    "\n" +
    "</div>");
}]);

angular.module("app/reminders/partials/reminderModal/reminderDeleteModal.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/reminders/partials/reminderModal/reminderDeleteModal.html",
    "<!--Reminder form-->\n" +
    "<div ng-show=\"! isDeleting\" class=\"reminder-form-container\">\n" +
    "\n" +
    "    <div class=\"reminder-form container box\">\n" +
    "        Are you sure you want to delete reminder with text <strong>{{reminder.model.text}}</strong> and with reminder id <strong>{{reminder.model.reminderId}}</strong>?\n" +
    "        <br />\n" +
    "        <a href=\"#\" class=\"btn-outline reminders__header__btn\" ng-click=\"deleteReminderAndClose(reminder)\">Delete reminder</a>\n" +
    "    </div>\n" +
    "\n" +
    "</div>\n" +
    "\n" +
    "<!--While saving-->\n" +
    "<div class=\"reminder-saving\" ng-show=\"isDeleting\">Deleting reminder..</div>");
}]);

angular.module("app/reminders/partials/reminderModal/reminderModal.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/reminders/partials/reminderModal/reminderModal.html",
    "<!--Reminder form-->\n" +
    "<div ng-show=\"! isSaving\" class=\"reminder-modal\">\n" +
    "    <form class=\"reminder-modal__form container box\" name=\"reminderForm\" ng-submit=\"saveReminder(reminderForm)\" novalidate focus-first-error>\n" +
    "\n" +
    "        <!--Reminder text-->\n" +
    "        <div class=\"form-group\" ng-class=\"{'has-error': reminderForm.text.$invalid && reminderForm.$submitted}\">\n" +
    "            <label>Remind me to:</label>\n" +
    "            <input class=\"form-control\" type=\"text\" placeholder=\"e.g. {{randomExample}}\" name=\"text\" maxlength=\"140\" ng-model=\"reminder.model.text\" nlp-date date=\"reminder.model.dueOn\" separator=\"@\" min-date=\"2014-01-01\" max-date=\"2018-01-01\" prefer=\"future\" auto-focus required />\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"reminder-modal__form__info\">\n" +
    "            <!--Reminder date picker-->\n" +
    "            <div class=\"reminder-modal__form__info--date\">\n" +
    "                <button type=\"button\" class=\"btn\" datepicker-popup ng-model=\"reminder.model.dueOn\" show-weeks=\"false\" datepicker-options=\"{starting_day:1}\" animate animate-on=\"nlpDate:dateChange\" animate-class=\"animated highlight-button\">\n" +
    "                    {{reminder.model.dueOn | friendlyDate}}\n" +
    "                </button>\n" +
    "            </div>\n" +
    "\n" +
    "            <!--Reminder time picker-->\n" +
    "            <div class=\"reminder-modal__form__info--time\" timepicker-popup dropdown ng-model=\"reminder.model.dueOn\" step=\"30\"></div>\n" +
    "        </div>\n" +
    "\n" +
    "        <!--Reminder addresses-->\n" +
    "        <div class=\"reminder-modal__form__addressees\">\n" +
    "            <div class=\"form-group\">\n" +
    "                <div class=\"form-control\">{{currentUser.model.email}}</div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div email-list ng-model=\"reminder.model.additionalAddresses\" max-emails=\"5\" parent-form=\"reminderForm\"></div>\n" +
    "        </div>\n" +
    "\n" +
    "        <!--Submit form button-->\n" +
    "        <button type=\"submit\" class=\"btn btn-primary btn-lg btn-create\">{{isNew ? \"Create reminder\" : \"Update reminder\"}}</button>\n" +
    "\n" +
    "    </form>\n" +
    "</div>\n" +
    "\n" +
    "<!--While saving-->\n" +
    "<div class=\"reminder-saving\" ng-show=\"isSaving\">{{isNew ? \"Saving reminder\" : \"Updating reminder\"}}</div>");
}]);

angular.module("app/feedback/partials/feedbackModal/feedbackModal.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/feedback/partials/feedbackModal/feedbackModal.html",
    "<form name=\"feedbackForm\" ng-submit=\"sendAndClose(feedbackForm)\" novalidate focus-first-error>\n" +
    "\n" +
    "    <div class=\"modal-header\">\n" +
    "        <h3>Feedback</h3>\n" +
    "    </div>\n" +
    "\n" +
    "\n" +
    "    <div class=\"modal-body\" ng-if=\"! isSending && ! isSent\">\n" +
    "        <div class=\"form-group\" ng-class=\"{'has-error': feedbackForm.name.$invalid && feedbackForm.submitted}\">\n" +
    "            <input class=\"form-control\" type=\"text\" name=\"name\" ng-model=\"feedbackMessage.attributes.name\" placeholder=\"Your name\" required auto-focus=\"isOpen\" />\n" +
    "        </div>\n" +
    "        <div class=\"form-group\" ng-class=\"{'has-error': feedbackForm.email.$invalid && feedbackForm.submitted}\">\n" +
    "            <input class=\"form-control\" type=\"email\" name=\"email\" ng-model=\"feedbackMessage.attributes.email\" placeholder=\"Your email address\" required />\n" +
    "        </div>\n" +
    "        <div class=\"form-group\" ng-class=\"{'has-error': feedbackForm.subject.$invalid && feedbackForm.submitted}\">\n" +
    "            <input class=\"form-control\" type=\"text\" name=\"subject\" ng-model=\"feedbackMessage.attributes.subject\" placeholder=\"Subject\" required />\n" +
    "        </div>\n" +
    "        <div class=\"form-group\" ng-class=\"{'has-error': feedbackForm.message.$invalid && feedbackForm.submitted}\">\n" +
    "            <textarea class=\"form-control\" rows=\"6\" name=\"message\" ng-model=\"feedbackMessage.attributes.message\" placeholder=\"Your message\" required></textarea>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"modal-body\" ng-if=\"isSending\">\n" +
    "        <div class=\"sending-status\">Sending your message..</div>\n" +
    "    </div>\n" +
    "\n" +
    "\n" +
    "    <div class=\"modal-body\" ng-if=\"isSent\">\n" +
    "        <div class=\"sending-status\">Thank you! You are awesome.</div>\n" +
    "    </div>\n" +
    "\n" +
    "\n" +
    "    <div class=\"modal-footer\">\n" +
    "        <button class=\"btn btn-link\" type=\"button\" ng-click=\"cancel()\">Cancel</button>\n" +
    "        <button class=\"btn btn-primary\" type=\"submit\" ng-disabled=\"isSending || isSent\">Send</button>\n" +
    "    </div>\n" +
    "</form>");
}]);

angular.module("app/account/partials/account.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/account/partials/account.html",
    "<!-- Account sections -->\n" +
    "<div class=\"account__sections\" account-form-toggle>\n" +
    "    <!--Sign in-->\n" +
    "    <div class=\"account__section\" ng-if=\"AccountFormToggle.state === ACCOUNT_FORM_STATE.login\" ng-controller=\"LoginCtrl\">\n" +
    "\n" +
    "        <!-- Title -->\n" +
    "        <h1 class=\"account__title\">Welcome!</h1>\n" +
    "\n" +
    "        <!-- Login form -->\n" +
    "        <form name=\"loginForm\" ng-submit=\"login(loginData)\" novalidate>\n" +
    "\n" +
    "            <!-- Account controls -->\n" +
    "            <div class=\"account__controls\">\n" +
    "\n" +
    "                <!-- General error -->\n" +
    "                <div class=\"alert alert-danger\" ng-if=\"isAuthenticationErrorOcurred\">Your email or password are wrong. Please try again.</div>\n" +
    "\n" +
    "                <!-- Form groups -->\n" +
    "                <div class=\"account__controls__form-groups--last\">\n" +
    "\n" +
    "                    <!-- Form group -->\n" +
    "                    <div class=\"form-group\" ng-class=\"{'has-error': isAuthenticationErrorOcurred || ( loginForm.email.$invalid && loginForm.$submitted )}\">\n" +
    "                        <input class=\"form-control\" type=\"email\" placeholder=\"email\" name=\"email\" ng-model=\"loginData.email\" required />\n" +
    "                        <div class=\"help-block\" ng-if=\"loginForm.$submitted\">\n" +
    "                            <div ng-if=\"loginForm.email.$error.required\">Your email address is mandatory.</div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <!-- Form group -->\n" +
    "                    <div class=\"form-group\" ng-class=\"{'has-error': isAuthenticationErrorOcurred || ( loginForm.password.$invalid && loginForm.$submitted )}\">\n" +
    "                        <input class=\"form-control\" type=\"password\" placeholder=\"password\" name=\"password\" ng-model=\"loginData.password\" required />\n" +
    "                        <div class=\"help-block\" ng-if=\"loginForm.$submitted\">\n" +
    "                            <div ng-if=\"loginForm.password.$error.required\">Your password is mandatory.</div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "\n" +
    "                <!-- Reset password -->\n" +
    "                <div class=\"form-group\">\n" +
    "                    <a class=\"link-secondary\" href=\"#\" ng-click=\"AccountFormToggle.setState(ACCOUNT_FORM_STATE.forgotPassword)\">Forgot login details?</a>\n" +
    "                </div>\n" +
    "\n" +
    "                <!-- Button container -->\n" +
    "                <button class=\"btn account__button\" type=\"submit\">Sign in</button>\n" +
    "            </div>\n" +
    "        </form>\n" +
    "\n" +
    "        <a class=\"link-primary\" href=\"#\" ng-click=\"AccountFormToggle.setState(ACCOUNT_FORM_STATE.signUp)\">Don't have an account yet? Sign up!</a>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "    <!--Sign up-->\n" +
    "    <div class=\"account__section\" ng-if=\"AccountFormToggle.state == ACCOUNT_FORM_STATE.signUp\" ng-controller=\"SignUpCtrl\">\n" +
    "\n" +
    "        <!-- Title -->\n" +
    "        <h1 class=\"account__title\">Get started!</h1>\n" +
    "\n" +
    "        <!-- Sign-up form -->\n" +
    "        <form name=\"signUpForm\" ng-submit=\"signUp(signUpData)\" novalidate focus-first-error-on-submit>\n" +
    "\n" +
    "            <!-- Account controls -->\n" +
    "            <div class=\"account__controls\">\n" +
    "\n" +
    "               <!-- General error -->\n" +
    "                <div class=\"alert alert-danger\" ng-if=\"isSignUpErrorOcurred\">\n" +
    "                     <span ng-repeat=\"errorMessage in errorMessages\">{{errorMessage}}</span>\n" +
    "                </div>\n" +
    "\n" +
    "                <!-- Form groups -->\n" +
    "                <div class=\"form-group\" ng-class=\"{'has-error': signUpForm.firstName.$invalid && signUpForm.$submitted}\">\n" +
    "                    <input class=\"form-control\" type=\"text\" placeholder=\"First Name\" name=\"firstName\" ng-model=\"signUpData.firstName\" required />\n" +
    "                    <span class=\"help-block\" ng-if=\"signUpForm.firstName.$invalid && signUpForm.$submitted\">Please tell us your First Name.</span>\n" +
    "                </div>\n" +
    "\n" +
    "                <!-- Form group -->\n" +
    "                <div class=\"form-group\" ng-class=\"{'has-error': signUpForm.lastName.$invalid && signUpForm.$submitted}\">\n" +
    "                    <input class=\"form-control\" type=\"text\" placeholder=\"Last Name\" name=\"lastName\" ng-model=\"signUpData.lastName\" required />\n" +
    "                    <span class=\"help-block\" ng-if=\"signUpForm.lastName.$invalid && signUpForm.$submitted\">Please tell us your Last Name.</span>\n" +
    "                </div>\n" +
    "\n" +
    "                <!-- Form groups -->\n" +
    "                <div class=\"account__controls__form-groups--last\">\n" +
    "\n" +
    "                    <!-- Form group -->\n" +
    "                    <div class=\"form-group\" ng-class=\"{'has-error': signUpForm.email.$invalid && signUpForm.$submitted}\">\n" +
    "                        <input class=\"form-control\" type=\"email\" placeholder=\"Your email address\" name=\"email\" ng-model=\"signUpData.email\" ng-model-options=\"{ debounce: 800 }\" required valid-email unique-email />\n" +
    "                        <div class=\"help-block\" ng-messages=\"signUpForm.email.$error\" ng-if=\"signUpForm.$submitted\">\n" +
    "                            <div ng-message=\"required\">Your email address is mandatory.</div>\n" +
    "                            <div ng-message=\"validEmail\">This email address is not valid.</div>\n" +
    "                            <div ng-message=\"uniqueEmail\">This email address is already used.</div>\n" +
    "                        </div>\n" +
    "                        <div class=\"help-block\" ng-if=\"signUpForm.email.$pending\">\n" +
    "                            Checking availability...\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <!-- Form group -->\n" +
    "                    <div class=\"form-group\" ng-class=\"{'has-error': signUpForm.password.$invalid && signUpForm.$submitted}\">\n" +
    "                        <input class=\"form-control\" type=\"password\" placeholder=\"Choose a password\" name=\"password\" ng-model=\"signUpData.password\" required strong-password />\n" +
    "                        <div class=\"help-block\" ng-messages=\"signUpForm.password.$error\" ng-if=\"signUpForm.$submitted\">\n" +
    "                             <div ng-message=\"required\">Please choose a password.</div>\n" +
    "                             <div ng-message=\"strongPassword\">Your password needs to be at least 7 characters long.</div>\n" +
    "                         </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "\n" +
    "                <!-- Button container -->\n" +
    "                <button class=\"btn account__button\" type=\"submit\">Create new account</button>\n" +
    "            </div>\n" +
    "        </form>\n" +
    "\n" +
    "         <a class=\"link-primary\" href=\"#\" ng-click=\"AccountFormToggle.setState(ACCOUNT_FORM_STATE.login)\">Already have an account? Sign in here!</a>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "    <!-- Sign up email sent section -->\n" +
    "    <div class=\"account__section\" ng-if=\"AccountFormToggle.state == ACCOUNT_FORM_STATE.signUpSuccessfully\">\n" +
    "\n" +
    "        <!-- Title -->\n" +
    "        <h1 class=\"account__title\">Email has been sent!</h1>\n" +
    "\n" +
    "        <!-- Explain -->\n" +
    "        <span class=\"account__explain\">\n" +
    "            We've sent you an email with the instructions on how to confirm your registration.\n" +
    "        </span>\n" +
    "\n" +
    "        <!-- Button container -->\n" +
    "        <a href=\"#\" ng-click=\"AccountFormToggle.setState(ACCOUNT_FORM_STATE.login)\">Continue</a>\n" +
    "    </div>\n" +
    "\n" +
    "    <!-- Recover password section -->\n" +
    "    <div class=\"account__section\" ng-if=\"AccountFormToggle.state == ACCOUNT_FORM_STATE.forgotPassword\" ng-controller=\"ForgotPasswordCtrl\">\n" +
    "\n" +
    "        <!-- Title -->\n" +
    "        <h1 class=\"account__title\">Can't remember your password?</h1>\n" +
    "\n" +
    "        <!-- Explain -->\n" +
    "        <span class=\"account__explain\">\n" +
    "            Enter below the e-mail you use to log in. <br />\n" +
    "            We'll send you instructions on how to reset your password.\n" +
    "        </span>\n" +
    "\n" +
    "        <!-- Forgot password form -->\n" +
    "        <form name=\"forgotPasswordForm\" ng-submit=\"requestPasswordReset(forgotPasswordData.email)\" novalidate focus-first-error-on-submit>\n" +
    "\n" +
    "            <!-- Account controls -->\n" +
    "            <div class=\"account__controls\">\n" +
    "\n" +
    "                  <!-- General error -->\n" +
    "                <div class=\"alert alert-info\" ng-if=\"isRequestPasswordErrorOcurred\">\n" +
    "                     <span ng-repeat=\"errorMessage in errorMessages\">{{errorMessage}}</span>\n" +
    "                </div>\n" +
    "\n" +
    "                <!-- Form groups -->\n" +
    "                <div class=\"account__controls__form-groups--last\">\n" +
    "\n" +
    "                    <!-- Form group -->\n" +
    "                    <div class=\"form-group\" ng-class=\"{'has-error': forgotPasswordForm.email.$invalid && forgotPasswordForm.$submitted }\">\n" +
    "                        <input class=\"form-control\" type=\"email\" placeholder=\"Your email address\" name=\"email\" ng-model=\"forgotPasswordData.email\" required valid-email />\n" +
    "                        <div class=\"help-block\" ng-messages=\"forgotPasswordForm.email.$error\" ng-if=\"forgotPasswordForm.$submitted\">\n" +
    "                            <div ng-message=\"required\">Your email address is mandatory.</div>\n" +
    "                            <div ng-message=\"validEmail\">This email address is not valid.</div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "\n" +
    "                <!-- Button container -->\n" +
    "                <button class=\"btn btn-primary btn-fixed-width btn-rounded account__button\" type=\"submit\">Reset password</button>\n" +
    "            </div>\n" +
    "        </form>\n" +
    "\n" +
    "        <a href=\"#\" ng-click=\"AccountFormToggle.setState(ACCOUNT_FORM_STATE.login)\">Nevermind, take me back!</a>\n" +
    "    </div>\n" +
    "\n" +
    "    <!-- Password recovery email sent section -->\n" +
    "    <div class=\"account__section\" ng-if=\"AccountFormToggle.state == ACCOUNT_FORM_STATE.forgotPasswordEmailSent\">\n" +
    "\n" +
    "        <!-- Title -->\n" +
    "        <h1 class=\"account__title\">Email has been sent!</h1>\n" +
    "\n" +
    "        <!-- Explain -->\n" +
    "            <span class=\"account__explain\">\n" +
    "                We've sent you an email with the instructions on how to reset your password.\n" +
    "            </span>\n" +
    "\n" +
    "        <!-- Button container -->\n" +
    "        <a href=\"#\" ng-click=\"AccountFormToggle.setState(ACCOUNT_FORM_STATE.login)\">Continue</a>\n" +
    "    </div>\n" +
    "\n" +
    "</div>\n" +
    "\n" +
    "");
}]);

angular.module("app/account/partials/logout.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/account/partials/logout.html",
    "<!-- Account sections -->\n" +
    "<div class=\"account__sections\">\n" +
    "\n" +
    "   <!-- Logout section -->\n" +
    "    <div class=\"account__section\">\n" +
    "\n" +
    "        <!-- Account controls -->\n" +
    "        <div class=\"account__controls\">\n" +
    "\n" +
    "             <!--Message-->\n" +
    "            <div class=\"alert alert-success\">\n" +
    "               We've successfully logged you out.\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "");
}]);

angular.module("app/account/partials/profile.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/account/partials/profile.html",
    "<!-- Account sections -->\n" +
    "<div class=\"account__sections\" profile-form-toggle>\n" +
    "\n" +
    "    <!-- Profile section -->\n" +
    "    <div class=\"account__section\" ng-if=\"ProfileFormToggle.state === ACCOUNT_FORM_STATE.updateProfile\" ng-controller=\"ProfileCtrl\">\n" +
    "\n" +
    "        <!-- Title -->\n" +
    "        <h1 class=\"account__title\">Modify profile</h1>\n" +
    "\n" +
    "        <!-- Profile form -->\n" +
    "        <form name=\"profileForm\" ng-submit=\"updateProfile(profileData)\" novalidate>\n" +
    "\n" +
    "            <!-- Account controls -->\n" +
    "            <div class=\"account__controls\">\n" +
    "\n" +
    "                 <!--Successfully message-->\n" +
    "                <div class=\"alert alert-success\" ng-if=\"isProfileUpdated\">\n" +
    "                   We've successfully updated your account.\n" +
    "                </div>\n" +
    "\n" +
    "                <!-- General error -->\n" +
    "                <div class=\"alert alert-danger\" ng-if=\"errorMessages && !isProfileUpdated\">\n" +
    "                   <span ng-repeat=\"errorMessage in errorMessages\">{{errorMessage}}</span>\n" +
    "                </div>\n" +
    "\n" +
    "                <!-- Form groups -->\n" +
    "                <div class=\"account__controls__form-groups account__controls__form-groups--last\">\n" +
    "\n" +
    "                    <!-- Form group -->\n" +
    "                    <div class=\"form-group\" ng-class=\"{'has-error': profileForm.firstName.$invalid && profileForm.$submitted}\">\n" +
    "                        <input class=\"form-control form-control-text-center form-control-fixed-width\" type=\"text\" placeholder=\"Prenume\" name=\"firstName\" ng-model=\"profileData.firstName\" required />\n" +
    "                        <span class=\"help-block\" ng-if=\"profileForm.firstName.$invalid && profileForm.$submitted\">Please tell us your First Name.</span>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <!-- Form group -->\n" +
    "                    <div class=\"form-group\" ng-class=\"{'has-error': profileForm.lastName.$invalid && profileForm.$submitted}\">\n" +
    "                        <input class=\"form-control form-control-text-center form-control-fixed-width\" type=\"text\" placeholder=\"Nume\" name=\"lastName\" ng-model=\"profileData.lastName\" required />\n" +
    "                        <span class=\"help-block\" ng-if=\"profileForm.lastName.$invalid && profileForm.$submitted\">Please tell us your Last Name.</span>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <!-- Form group -->\n" +
    "                    <div class=\"form-group\" ng-class=\"{'has-error': profileForm.email.$invalid && profileForm.$submitted}\">\n" +
    "                        <input class=\"form-control form-control-text-center form-control-fixed-width\" type=\"text\" placeholder=\"Email\" name=\"email\" ng-model=\"profileData.email\" required />\n" +
    "                        <span class=\"help-block\" ng-if=\"profileForm.email.$invalid && profileForm.$submitted\">Please tell us your email.</span>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "\n" +
    "                <!-- Button container -->\n" +
    "                <button class=\"btn btn-primary btn-fixed-width btn-rounded account__button\" type=\"submit\">SAVE</button>\n" +
    "            </div>\n" +
    "        </form>\n" +
    "\n" +
    "        <a href=\"#\" ng-click=\"ProfileFormToggle.setState(ACCOUNT_FORM_STATE.updatePassword)\">Change password.</a>\n" +
    "        <br />\n" +
    "        <br />\n" +
    "        <a href=\"#\" ng-click=\"getMeBack()\">{{profileForm.updated ? 'Ok, get me back.' : 'Nevermind.'}}</a>\n" +
    "    </div>\n" +
    "\n" +
    "    <!-- Update password section -->\n" +
    "    <div class=\"account__section\" ng-if=\"ProfileFormToggle.state === ACCOUNT_FORM_STATE.updatePassword\" ng-controller=\"UpdatePasswordCtrl\">\n" +
    "\n" +
    "        <!-- Title -->\n" +
    "        <h1 class=\"account__title\">Welcome!</h1>\n" +
    "\n" +
    "        <!-- Update password form -->\n" +
    "        <form name=\"updatePasswordForm\" ng-submit=\"updatePassword(updatePasswordData)\" novalidate>\n" +
    "\n" +
    "            <!-- Account controls -->\n" +
    "            <div class=\"account__controls\">\n" +
    "\n" +
    "                <!-- General error -->\n" +
    "                <div class=\"alert alert-danger\" ng-if=\"isUpdatePasswordErrorOcurred\">\n" +
    "                     <span ng-repeat=\"errorMessage in errorMessages\">{{errorMessage}}</span>\n" +
    "                </div>\n" +
    "\n" +
    "                <!-- Form groups -->\n" +
    "                <div class=\"account__controls__form-groups--last\">\n" +
    "\n" +
    "                    <!-- Form group -->\n" +
    "                    <div class=\"form-group\" ng-class=\"{'has-error': isUpdatePasswordErrorOcurred || (updatePasswordForm.oldPassword.$invalid && updatePasswordForm.$submitted)}\">\n" +
    "                        <input class=\"form-control\" type=\"password\" placeholder=\"Old password\" name=\"oldPassword\" ng-model=\"updatePasswordData.oldPassword\" required />\n" +
    "                        <span class=\"help-block\" ng-if=\"updatePasswordForm.oldPassword.$invalid && updatePasswordForm.$submitted\">Your old password is mandatory.</span>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <!-- Form group -->\n" +
    "                    <div class=\"form-group\" ng-class=\"{'has-error': isUpdatePasswordErrorOcurred || (updatePasswordForm.newPassword.$invalid && updatePasswordForm.$submitted)}\">\n" +
    "                        <input class=\"form-control\" type=\"password\" placeholder=\"New password\" name=\"newPassword\" ng-model=\"updatePasswordData.newPassword\" required />\n" +
    "                        <span class=\"help-block\" ng-if=\"updatePasswordForm.newPassword.$invalid && updatePasswordForm.$submitted\">Your confirm password is mandatory.</span>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <!-- Form group -->\n" +
    "                    <div class=\"form-group\" ng-class=\"{'has-error': isUpdatePasswordErrorOcurred || (updatePasswordForm.newPasswordConfirmation.$invalid && updatePasswordForm.$submitted)}\">\n" +
    "                        <input class=\"form-control\" type=\"password\" placeholder=\"New password confirmation\" name=\"newPasswordConfirmation\" ng-model=\"updatePasswordData.newPasswordConfirmation\" required />\n" +
    "                        <span class=\"help-block\" ng-if=\"updatePasswordForm.newPasswordConfirmation.$invalid && updatePasswordForm.$submitted\">Your confirm password is mandatory.</span>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "\n" +
    "                <!-- Button container -->\n" +
    "                <button class=\"btn account__button\" type=\"submit\">Update password</button>\n" +
    "            </div>\n" +
    "        </form>\n" +
    "\n" +
    "        <a href=\"#\" ng-click=\"ProfileFormToggle.setState(ACCOUNT_FORM_STATE.updateProfile)\">Nevermind, take me back!</a>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "    <!-- Change password section successfully-->\n" +
    "    <div class=\"account__section\" ng-if=\"ProfileFormToggle.state == ACCOUNT_FORM_STATE.updatePasswordSuccessfully\">\n" +
    "\n" +
    "        <!-- Title -->\n" +
    "        <h1 class=\"account__title\">Successfully</h1>\n" +
    "\n" +
    "        <!-- Explain -->\n" +
    "            <span class=\"account__explain\">\n" +
    "                We've successfully updated your new password.\n" +
    "            </span>\n" +
    "\n" +
    "        <!-- Button container -->\n" +
    "        <a href=\"#\" ng-click=\"ProfileFormToggle.setState(ACCOUNT_FORM_STATE.updateProfile)\">Continue</a>\n" +
    "    </div>\n" +
    "\n" +
    "</div>");
}]);

angular.module("app/account/partials/signup_confirm_abstract.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/account/partials/signup_confirm_abstract.html",
    "<!--Validate password reset token section - abstract view-->\n" +
    "<div class=\"account__sections\">\n" +
    "\n" +
    "     <!-- Title -->\n" +
    "    <h1 class=\"account__title\">Registration confirmation</h1>\n" +
    "\n" +
    "    <div ui-view></div>\n" +
    "\n" +
    "</div>");
}]);

angular.module("app/account/partials/signup_confirm_invalid.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/account/partials/signup_confirm_invalid.html",
    "<!-- Registration confirmation invalid -->\n" +
    "<div class=\"account__section\">\n" +
    "\n" +
    "    <!-- Explain -->\n" +
    "    <span class=\"account__explain\">\n" +
    "        We couldn't do it.\n" +
    "    </span>\n" +
    "</div>");
}]);

angular.module("app/account/partials/signup_confirm_valid.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/account/partials/signup_confirm_valid.html",
    "<!-- Registration confirmation valid -->\n" +
    "<div class=\"account__section\">\n" +
    "\n" +
    "    <!-- Explain -->\n" +
    "    <span class=\"account__explain\">\n" +
    "        We've successfully confirmed your email.\n" +
    "    </span>\n" +
    "\n" +
    "    <!-- Button container -->\n" +
    "    <a href=\"#\" ng-click=\"continueToLogin()\">Continue</a>\n" +
    "</div>");
}]);

angular.module("app/account/partials/validate_password_reset_token.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/account/partials/validate_password_reset_token.html",
    "<!-- Account sections -->\n" +
    "<div class=\"account__sections\">\n" +
    "\n" +
    "      <!-- Validated token result -->\n" +
    "    <div class=\"alert alert-danger\" ng-if=\"errorMessages && !isTokenValid\">\n" +
    "       <span ng-repeat=\"errorMessage in errorMessages\">{{errorMessage}}</span>\n" +
    "\n" +
    "        <br />\n" +
    "        <br />\n" +
    "\n" +
    "        <!-- Button container -->\n" +
    "        <a href=\"#\" ng-click=\"continueToResetPassword()\">Let me try again.</a>\n" +
    "        <br />\n" +
    "        <span ng-if=\"isUserAuthenticated\">\n" +
    "            You are authenticated. You will be logged off if you want to try again.\n" +
    "        </span>\n" +
    "    </div>\n" +
    "\n" +
    "    <!-- Validate password reset token section -->\n" +
    "    <div class=\"account__section\" ng-hide=\"!isTokenValid || successfullyReseted\">\n" +
    "\n" +
    "        <!-- Title -->\n" +
    "         <h1 class=\"account__title\">Reset your password.</h1>\n" +
    "\n" +
    "        <!-- Reset password form -->\n" +
    "        <form name=\"resetPasswordForm\" ng-submit=\"resetPassword(resetPasswordData)\" novalidate>\n" +
    "\n" +
    "            <!-- Account controls -->\n" +
    "            <div class=\"account__controls\">\n" +
    "\n" +
    "                <!-- General error -->\n" +
    "                <div class=\"alert alert-danger\" ng-if=\"isResetPasswordErrorOcurred\">\n" +
    "                     <span ng-repeat=\"errorMessage in errorMessages\">{{errorMessage}}</span>\n" +
    "                </div>\n" +
    "\n" +
    "                <!-- Form groups -->\n" +
    "                <div class=\"account__controls__form-groups--last\">\n" +
    "\n" +
    "                    <!-- Form group -->\n" +
    "                    <div class=\"form-group\" ng-class=\"{'has-error': isResetPasswordErrorOcurred || (resetPasswordForm.password.$invalid && resetPasswordForm.$submitted)}\">\n" +
    "                        <input class=\"form-control\" type=\"password\" placeholder=\"New password\" name=\"password\" ng-model=\"resetPasswordData.password\" required />\n" +
    "                        <span class=\"help-block\" ng-if=\"resetPasswordForm.password.$invalid && resetPasswordForm.$submitted\">Your new password is mandatory.</span>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <!-- Form group -->\n" +
    "                    <div class=\"form-group\" ng-class=\"{'has-error': isResetPasswordErrorOcurred || (resetPasswordForm.passwordConfirmation.$invalid && resetPasswordForm.$submitted)}\">\n" +
    "                        <input class=\"form-control\" type=\"password\" placeholder=\"New password confirmation\" name=\"passwordConfirmation\" ng-model=\"resetPasswordData.passwordConfirmation\" required />\n" +
    "                        <span class=\"help-block\" ng-if=\"resetPasswordForm.passwordConfirmation.$invalid && resetPasswordForm.$submitted\">Your confirm password is mandatory.</span>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "\n" +
    "                <!-- Button container -->\n" +
    "                <button class=\"btn account__button\" type=\"submit\">Reset password</button>\n" +
    "            </div>\n" +
    "        </form>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "    <!-- Change password section successfully-->\n" +
    "    <div class=\"account__section\" ng-hide=\"!successfullyReseted\">\n" +
    "\n" +
    "        <!-- Title -->\n" +
    "        <h1 class=\"account__title\">Successfully</h1>\n" +
    "\n" +
    "        <!-- Explain -->\n" +
    "        <span class=\"account__explain\">\n" +
    "            We've successfully updated your new password.\n" +
    "        </span>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("app/account/partials/validate_password_reset_token_abstract.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/account/partials/validate_password_reset_token_abstract.html",
    "<!--Validate password reset token section - abstract view-->\n" +
    "<div class=\"account__sections\">\n" +
    "\n" +
    "    <div ui-view></div>\n" +
    "\n" +
    "</div>");
}]);

angular.module("app/account/partials/validate_password_reset_token_invalid.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/account/partials/validate_password_reset_token_invalid.html",
    "<!-- Invalid token result view -->\n" +
    "<div class=\"alert alert-danger\">\n" +
    "    The token is invalid or expired.\n" +
    "    <br />\n" +
    "    <br />\n" +
    "\n" +
    "    <!-- Button container -->\n" +
    "    <a href=\"#\" ng-click=\"continueToResetPassword()\">Let me try again.</a>\n" +
    "    <br />\n" +
    "    <span ng-if=\"isUserAuthenticated\">\n" +
    "        You are authenticated. You will be logged off if you want to try again.\n" +
    "    </span>\n" +
    "</div>");
}]);

angular.module("app/account/partials/validate_password_reset_token_valid.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/account/partials/validate_password_reset_token_valid.html",
    "<!-- Valid token view -->\n" +
    "<div class=\"account__section\" ng-hide=\"successfullyReseted\">\n" +
    "\n" +
    "    <!-- Title -->\n" +
    "     <h1 class=\"account__title\">Reset your password.</h1>\n" +
    "\n" +
    "    <!-- Reset password form -->\n" +
    "    <form name=\"resetPasswordForm\" ng-submit=\"resetPassword(resetPasswordData)\" novalidate>\n" +
    "\n" +
    "        <!-- Account controls -->\n" +
    "        <div class=\"account__controls\">\n" +
    "\n" +
    "            <!-- General error -->\n" +
    "            <div class=\"alert alert-danger\" ng-if=\"isResetPasswordErrorOcurred\">\n" +
    "                 <span ng-repeat=\"errorMessage in errorMessages\">{{errorMessage}}</span>\n" +
    "            </div>\n" +
    "\n" +
    "            <!-- Form groups -->\n" +
    "            <div class=\"account__controls__form-groups--last\">\n" +
    "\n" +
    "                <!-- Form group -->\n" +
    "                <div class=\"form-group\" ng-class=\"{'has-error': isResetPasswordErrorOcurred || (resetPasswordForm.password.$invalid && resetPasswordForm.$submitted)}\">\n" +
    "                    <input class=\"form-control\" type=\"password\" placeholder=\"New password\" name=\"password\" ng-model=\"resetPasswordData.password\" required />\n" +
    "                    <span class=\"help-block\" ng-if=\"resetPasswordForm.password.$invalid && resetPasswordForm.$submitted\">Your new password is mandatory.</span>\n" +
    "                </div>\n" +
    "\n" +
    "                <!-- Form group -->\n" +
    "                <div class=\"form-group\" ng-class=\"{'has-error': isResetPasswordErrorOcurred || (resetPasswordForm.passwordConfirmation.$invalid && resetPasswordForm.$submitted)}\">\n" +
    "                    <input class=\"form-control\" type=\"password\" placeholder=\"New password confirmation\" name=\"passwordConfirmation\" ng-model=\"resetPasswordData.passwordConfirmation\" required />\n" +
    "                    <span class=\"help-block\" ng-if=\"resetPasswordForm.passwordConfirmation.$invalid && resetPasswordForm.$submitted\">Your confirm password is mandatory.</span>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <!-- Button container -->\n" +
    "            <button class=\"btn account__button\" type=\"submit\">Reset password</button>\n" +
    "        </div>\n" +
    "    </form>\n" +
    "\n" +
    "</div>\n" +
    "\n" +
    "<!-- Change password section successfully-->\n" +
    "<div class=\"account__section\" ng-hide=\"!successfullyReseted\">\n" +
    "\n" +
    "    <!-- Title -->\n" +
    "    <h1 class=\"account__title\">Successfully</h1>\n" +
    "\n" +
    "    <!-- Explain -->\n" +
    "    <span class=\"account__explain\">\n" +
    "        We've successfully updated your new password.\n" +
    "    </span>\n" +
    "</div>");
}]);

angular.module("app/common/partials/emailList/emailList.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/common/partials/emailList/emailList.html",
    "<div ng-repeat=\"email in emails track by $index\">\n" +
    "    <ng-form name=\"emailForm\">\n" +
    "        <div class=\"form-group\" ng-class=\"{'has-error': emailForm.email.$invalid && parentForm.submitted}\">\n" +
    "            <input class=\"form-control\" type=\"email\" placeholder=\"Your friend's email address\" name=\"email\" ng-model=\"emails[$index]\" required />\n" +
    "            <a href=\"#\" class=\"close\" tabindex=\"-1\" ng-click=\"removeEmail($index)\">×</a>\n" +
    "        </div>\n" +
    "    </ng-form>\n" +
    "</div>\n" +
    "\n" +
    "<a class=\"btn-add-emails\" href=\"#\" ng-click=\"addEmail()\" ng-show=\"canAddEmail\">Add another email recipient</a>");
}]);

angular.module("app/common/partials/header.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/common/partials/header.html",
    "<header class=\"header\">\n" +
    "    <div class=\"header__wrapper\">\n" +
    "\n" +
    "        <div class=\"header__wrapper__logo\">\n" +
    "            Reme\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"header__wrapper__menu dropdown\" dropdown>\n" +
    "            <a ng-show=\"currentUser.model.email\" class=\"link-dark-bg dropdown-toggle\" dropdown-toggle href=\"javascript:void(0)\">{{currentUser.model.email}}<span class=\"caret\"></span></a>\n" +
    "              <ul class=\"dropdown-menu\" role=\"menu\">\n" +
    "                <li><a class=\"nav-link\" href=\"javascript:void(0)\" ui-sref=\"reminders\">My reminders</a></li>\n" +
    "                <li><a class=\"nav-link\" href=\"javascript:void(0)\" ui-sref=\"profile\">Settings</a></li>\n" +
    "                <li><a class=\"nav-link\" href=\"javascript:void(0)\" ui-sref=\"profile\">Help</a></li>\n" +
    "                <li><a class=\"nav-link\" href=\"javascript:void(0)\" ui-sref=\"account:logout\">Logout</a></li>\n" +
    "              </ul>\n" +
    "        </div>\n" +
    "\n" +
    "    </div>\n" +
    "</header>");
}]);

angular.module("app/common/partials/timepickerPopup/timepickerPopup.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/common/partials/timepickerPopup/timepickerPopup.html",
    "<button type=\"button\" class=\"btn btn-default bg-sprite dropdown-toggle\" animate animate-on=\"nlpDate:timeChange\" animate-class=\"animated highlight-button\" dropdown-toggle>\n" +
    "        {{date | date:'hh:mm a'}}\n" +
    "</button>\n" +
    "<ul class=\"dropdown-menu dropdown-menu-time-picker\" perfect-scrollbar suppress-scroll-x=\"true\" wheel-speed=\"52\" update-on=\"perfectScrollbar:update\">\n" +
    "    <li ng-repeat=\"time in times\" ng-class=\"{selected: highlightSelected && time.index == selectedIndex}\">\n" +
    "        <a href ng-click=\"setTime(time.index, time.hour, time.minute)\">{{time.timestamp | date:'hh:mm a'}}</a>\n" +
    "    </li>\n" +
    "</ul>\n" +
    "");
}]);

angular.module("template/datepicker/datepicker.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/datepicker/datepicker.html",
    "<table class=\"datepicker\">\n" +
    "  <thead>\n" +
    "    <tr class=\"datepicker-jump-controls\">\n" +
    "      <th><button type=\"button\" class=\"btn btn-default btn-sm pull-left\" ng-click=\"move(-1)\">‹</button></th>\n" +
    "      <th colspan=\"{{rows[0].length - 2 + showWeekNumbers}}\"><button type=\"button\" class=\"btn btn-default btn-sm btn-block\" ng-click=\"toggleMode()\"><strong>{{title}}</strong></button></th>\n" +
    "      <th><button type=\"button\" class=\"btn btn-default btn-sm btn-block pull-right\" ng-click=\"move(1)\">›</button></th>\n" +
    "    </tr>\n" +
    "    <tr ng-show=\"labels.length > 0\" class=\"datepicker-day-labels\">\n" +
    "      <th ng-show=\"showWeekNumbers\" class=\"text-center\">#</th>\n" +
    "      <th ng-repeat=\"label in labels\" class=\"text-center\">{{label}}</th>\n" +
    "    </tr>\n" +
    "  </thead>\n" +
    "  <tbody>\n" +
    "    <tr ng-repeat=\"row in rows\">\n" +
    "      <td ng-show=\"showWeekNumbers\" class=\"text-center\"><em>{{ getWeekNumber(row) }}</em></td>\n" +
    "      <td ng-repeat=\"dt in row\" class=\"text-center\">\n" +
    "        <button type=\"button\" class=\"btn btn-sm\" ng-class=\"{'btn-primary': dt.selected, 'btn-default': !dt.selected}\" ng-click=\"select(dt.date)\" ng-disabled=\"dt.disabled\"><span ng-class=\"{'text-muted': dt.secondary}\">{{dt.label}}</span></button>\n" +
    "      </td>\n" +
    "    </tr>\n" +
    "  </tbody>\n" +
    "</table>\n" +
    "");
}]);

angular.module("template/datepicker/popup.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/datepicker/popup.html",
    "<ul class=\"dropdown-menu\" ng-style=\"{display: (isOpen && 'block') || 'none', top: position.top+'px', left: position.left+'px'}\">\n" +
    "	<li ng-transclude></li>\n" +
    "	<li ng-show=\"showButtonBar\" class=\"datepicker-button-bar\">\n" +
    "        <button type=\"button\" class=\"btn btn-sm btn-default btn-block\" ng-click=\"today(dt)\">{{currentText}}</button>\n" +
    "	</li>\n" +
    "</ul>\n" +
    "");
}]);

angular.module("template/modal/backdrop.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/modal/backdrop.html",
    "<div class=\"modal-backdrop fade\" ng-class=\"{in: animate}\" ng-style=\"{'z-index': 1040 + index*10}\"></div>");
}]);

angular.module("template/modal/window.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/modal/window.html",
    "<div tabindex=\"-1\" class=\"modal fade {{ windowClass }}\" ng-class=\"{in: animate}\" ng-style=\"{'z-index': 1050 + index*10, display: 'block'}\" ng-click=\"close($event)\">\n" +
    "    <div class=\"modal-dialog\"><div class=\"modal-content\" ng-transclude></div></div>\n" +
    "</div>");
}]);

angular.module("template/popover/popover.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/popover/popover.html",
    "<div class=\"popover {{placement}}\" ng-class=\"{ in: isOpen(), fade: animation() }\">\n" +
    "  <div class=\"arrow\"></div>\n" +
    "\n" +
    "  <div class=\"popover-inner\">\n" +
    "      <h3 class=\"popover-title\" ng-bind=\"title\" ng-show=\"title\"></h3>\n" +
    "      <div class=\"popover-content\" ng-bind=\"content\"></div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("template/tabs/tab.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/tabs/tab.html",
    "<li ng-class=\"{active: active, disabled: disabled}\">\n" +
    "    <a href ng-click=\"select()\" tab-heading-transclude>{{heading}}</a>\n" +
    "</li>\n" +
    "");
}]);

angular.module("template/tabs/tabset.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/tabs/tabset.html",
    "<div>\n" +
    "    <ul class=\"nav nav-{{type || 'tabs'}}\" ng-class=\"{'nav-stacked': vertical, 'nav-justified': justified}\"\n" +
    "        ng-transclude></ul>\n" +
    "    <div class=\"tab-content\">\n" +
    "        <div class=\"tab-pane\"\n" +
    "             ng-repeat=\"tab in tabs\"\n" +
    "             ng-class=\"{active: tab.active}\"\n" +
    "             tab-content-transclude=\"tab\">\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("template/tooltip/tooltip-html-unsafe-popup.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/tooltip/tooltip-html-unsafe-popup.html",
    "<div class=\"tooltip {{placement}}\" ng-class=\"{ in: isOpen(), fade: animation() }\">\n" +
    "  <div class=\"tooltip-arrow\"></div>\n" +
    "  <div class=\"tooltip-inner\" bind-html-unsafe=\"content\"></div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("template/tooltip/tooltip-popup.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/tooltip/tooltip-popup.html",
    "<div class=\"tooltip {{placement}}\" ng-class=\"{ in: isOpen(), fade: animation() }\">\n" +
    "  <div class=\"tooltip-arrow\"></div>\n" +
    "  <div class=\"tooltip-inner\" ng-bind=\"content\"></div>\n" +
    "</div>\n" +
    "");
}]);
