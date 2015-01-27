angular.module('partials', ['app/site/partials/404.html', 'app/site/partials/500.html', 'app/site/partials/about.html', 'app/site/partials/home.html', 'app/site/partials/privacy.html', 'app/reminders/partials/reminder/reminder.list.template.html', 'app/reminders/partials/reminder/reminders.action.html', 'app/reminders/partials/reminder/reminders.list.html', 'app/reminders/partials/reminder/reminders.template.html', 'app/reminders/partials/reminderModal/reminder_create_update_modal.html', 'app/reminders/partials/reminderModal/reminder_delete_modal.html', 'app/account/partials/account.html', 'app/account/partials/logout.html', 'app/account/partials/settings/settings.html', 'app/account/partials/settings/settings.preferences.html', 'app/account/partials/settings/settings.profile.html', 'app/account/partials/signup_confirm_abstract.html', 'app/account/partials/signup_confirm_invalid.html', 'app/account/partials/signup_confirm_valid.html', 'app/account/partials/validate_password_reset_token_abstract.html', 'app/account/partials/validate_password_reset_token_invalid.html', 'app/account/partials/validate_password_reset_token_valid.html', 'app/common/partials/emailList/emailList.html', 'app/common/partials/flash-messages.html', 'app/common/partials/footer-home.html', 'app/common/partials/footer.html', 'app/common/partials/header-home.html', 'app/common/partials/header.html', 'app/common/partials/timepickerPopup/timepickerPopup.html', 'template/datepicker/datepicker.html', 'template/datepicker/popup.html', 'template/modal/backdrop.html', 'template/modal/window.html', 'template/popover/popover.html', 'template/tabs/tab.html', 'template/tabs/tabset.html', 'template/tooltip/tooltip-html-unsafe-popup.html', 'template/tooltip/tooltip-popup.html']);

angular.module("app/site/partials/404.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/site/partials/404.html",
    "<div class=\"error__sections\">\n" +
    "    <h1 class=\"error__sections__heading\">Hmm... looks like a 404</h1>\n" +
    "\n" +
    "    <div class=\"error__sections__reason\">We can't really impress you since that page doesn't actually exist.</div>\n" +
    "    <div class=\"error__sections__reason error__sections__reason--last\">Probably a typo or the page may have moved.</div>\n" +
    "\n" +
    "    <a class=\"error__sections__link\" href=\"javascript:void(0)\" ng-click=\"goToHomePage()\">Go to homepage</a>\n" +
    "\n" +
    "</div>");
}]);

angular.module("app/site/partials/500.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/site/partials/500.html",
    "<div class=\"error__sections\">\n" +
    "    <h1 class=\"error__sections__heading\">Oops... you found a 500</h1>\n" +
    "\n" +
    "    <div class=\"error__sections__reason\">Nothing you did. It seems like an internal problem on the server.</div>\n" +
    "    <div class=\"error__sections__reason error__sections__reason--last\">If this happens again please let us know at <a class=\"link-primary\" href=\"mailto:hello@reme.io\">hello@reme.io</a></div>\n" +
    "\n" +
    "    <a class=\"error__sections__link\" href=\"javascript:void(0)\" ng-click=\"goToHomePage()\">Go to homepage</a>\n" +
    "\n" +
    "</div>");
}]);

angular.module("app/site/partials/about.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/site/partials/about.html",
    "<div header-home class=\"view-container__header\"></div>\n" +
    "\n" +
    "<div class=\"view-container--about\">\n" +
    "    <div class=\"about__sections\">\n" +
    "        <h1 class=\"about__sections__heading\">About us</h1>\n" +
    "\n" +
    "        <h1 class=\"about__sections__description\">\n" +
    "            We are a small team of 3 and we're really passioned about building Reme. Our main goal is to make our users happy (that's you!)\n" +
    "            and we hope you like using it. If you'd like to say hi, here we are.\n" +
    "        </h1>\n" +
    "\n" +
    "        <div class=\"about__sections__team\">\n" +
    "            <div class=\"about__sections__team__entry\">\n" +
    "                <img class=\"about__sections__team__entry__img\" src=\"/build/assets/img/c4162760-9cf2-11e4-9312-dbead076a43a.png\">\n" +
    "\n" +
    "                <div class=\"about__sections__team__desc\">Sorin Pantiş</div>\n" +
    "                <div class=\"about__sections__team__link\">\n" +
    "                    <a href=\"https://twitter.com/sorinpantis\" target=\"_blank\">@sorinpantis</a>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"about__sections__team__entry\">\n" +
    "                <img class=\"about__sections__team__entry__img\" src=\"/build/assets/img/c418c0b0-9cf2-11e4-80a4-abd6c14b15d2.png\">\n" +
    "\n" +
    "                <div class=\"about__sections__team__desc\">Tamás Pap</div>\n" +
    "                <div class=\"about__sections__team__link\">\n" +
    "                    <a href=\"https://twitter.com/paptamas\" target=\"_blank\">@paptamas</a>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"about__sections__team__entry\">\n" +
    "                <img class=\"about__sections__team__entry__img\" src=\"/build/assets/img/c4105efc-9cf2-11e4-99aa-22889cb05bd0s.jpg\">\n" +
    "\n" +
    "                <div class=\"about__sections__team__desc\">Ioan Lucuţ</div>\n" +
    "                <div class=\"about__sections__team__link\">\n" +
    "                    <a href=\"https://twitter.com/ioanlucut\" target=\"_blank\">@ioanlucut</a>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "<div footer-home class=\"view-container__footer footer-about\"></div>");
}]);

angular.module("app/site/partials/home.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/site/partials/home.html",
    "<div header-home class=\"view-container__header\"></div>\n" +
    "\n" +
    "<div class=\"home\">\n" +
    "\n" +
    "    <div class=\"home__signup\">\n" +
    "        <div class=\"centered-section-home\">\n" +
    "\n" +
    "            <h1 class=\"home__signup__title\">Create email reminders in seconds!</h1>\n" +
    "\n" +
    "            <h3 class=\"home__signup__description\">The sole purpose of Reme is to remind you the things that matter. Create a reminder and forget about it! Reme will not.</h3>\n" +
    "\n" +
    "            <!-- Register  section -->\n" +
    "            <div class=\"home__signup__sections\" account-form-toggle>\n" +
    "\n" +
    "                <!-- Request registration section -->\n" +
    "                <div class=\"home__signup__sections__section\" ng-if=\"AccountFormToggle.state == ACCOUNT_FORM_STATE.requestSignUpRegistration\" ng-controller=\"RequestSignUpRegistrationCtrl\">\n" +
    "\n" +
    "                    <!-- Request registration form -->\n" +
    "                    <form name=\"requestSignUpRegistrationForm\" ng-submit=\"requestSignUpRegistration()\" novalidate focus-first-error>\n" +
    "\n" +
    "                        <!-- Account controls -->\n" +
    "                        <div class=\"home__signup__sections__section__controls\">\n" +
    "\n" +
    "                            <!-- Email input -->\n" +
    "                            <div class=\"home__signup__sections__section__controls--information\">\n" +
    "                                <input class=\"form-control home__signup__sections__section__controls__email\" ng-class=\"{'has-error': requestSignUpRegistrationForm.email.$invalid && requestSignUpRegistrationForm.$submitted}\" type=\"email\" placeholder=\"Email address\" name=\"email\" ng-model=\"requestSignUpRegistrationData.email\" required valid-email unique-email />\n" +
    "\n" +
    "                                <!-- Error messages -->\n" +
    "                                <div class=\"home__signup__sections__section__validation-messages\" ng-class=\"{'has-error': requestSignUpRegistrationForm.email.$invalid && requestSignUpRegistrationForm.$submitted}\" ng-messages=\"requestSignUpRegistrationForm.email.$error\" ng-if=\"requestSignUpRegistrationForm.$submitted\">\n" +
    "                                    <div ng-message=\"required\">Your email address is mandatory.</div>\n" +
    "                                    <div ng-message=\"validEmail\">This email address is not valid.</div>\n" +
    "                                    <div ng-message=\"uniqueEmail\">This email address is already used.</div>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "\n" +
    "                            <!-- Button container -->\n" +
    "                            <button type=\"submit\" ladda=\"isRequestPending\" data-style=\"expand-left\" data-spinner-size=\"20\" class=\"btn home__signup__sections__section__controls__button\">Get started for FREE!</button>\n" +
    "                        </div>\n" +
    "                    </form>\n" +
    "\n" +
    "                    <div class=\"text-center text-muted home__signup__sections__section--migration\">\n" +
    "                        Rest assured, the reminders created in old Reme will be imported in your account after you sign up.\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "\n" +
    "                <!-- Request registration email sent section -->\n" +
    "                <div class=\"home__signup__sections__section home__signup__sections__section--success alert alert-success\" ng-if=\"AccountFormToggle.state == ACCOUNT_FORM_STATE.requestSignUpRegistrationEmailSent\">\n" +
    "\n" +
    "                    <!-- Title -->\n" +
    "                    <h1 class=\"home__signup__sections__section__submitted-title\">Thanks for signing up!</h1>\n" +
    "\n" +
    "                    <!-- Explain -->\n" +
    "                    <span class=\"home__signup__sections__section__submitted-message\">\n" +
    "                        Please check your email. There's one more step in order to create your account.\n" +
    "                    </span>\n" +
    "                </div>\n" +
    "\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"home__testimonials\">\n" +
    "        <div class=\"centered-section-home\">\n" +
    "            <div class=\"img_sprite press_logo lifehacker\">Lifehacker</div>\n" +
    "            <div class=\"img_sprite press_logo producthunt\">ProductHunt</div>\n" +
    "            <div class=\"img_sprite press_logo makeuseof\">MakeUseOf</div>\n" +
    "            <div class=\"img_sprite press_logo feedmyapp\">FeedMyApp</div>\n" +
    "            <div class=\"img_sprite press_logo newstartups\">NewStartups</div>\n" +
    "            <div class=\"img_sprite press_logo addictivetips\">AddictiveTips</div>\n" +
    "            <a class=\"img_sprite chromewebstore\" target=\"_blank\" href=\"https://chrome.google.com/webstore/detail/remeio/jagdnkmjmgengjocecgcilbpgffmlmep\">\n" +
    "                <span class=\"\">Reme</span> is available on <br> Chrome Web Store\n" +
    "            </a>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "</div>\n" +
    "\n" +
    "<div footer-home class=\"view-container__footer\"></div>\n" +
    "\n" +
    "");
}]);

angular.module("app/site/partials/privacy.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/site/partials/privacy.html",
    "<div header-home class=\"view-container__header\"></div>\n" +
    "\n" +
    "<div class=\"view-container--terms\">\n" +
    "\n" +
    "    <div class=\"privacy__sections\">\n" +
    "\n" +
    "        <h1>Terms of use</h1>\n" +
    "        <ul>\n" +
    "            <li>Reme is a tool created in the sole purpose of helping people get organized by creating reminders which will be sent to the provided e-mail address(es) at a specific date and time. Reme is not responsible for the content entered by the user.</li>\n" +
    "            <li>Reme uses e-mail as the only notification method. Reme is not responsible for missed dead-lines, appointments or other time-critical events.</li>\n" +
    "        </ul>\n" +
    "\n" +
    "        <h3>What personal data do we collect?</h3>\n" +
    "        <ul>\n" +
    "            <li>By registering or authenticating, you allow Reme to identify you and give you access to its services.</li>\n" +
    "            <li>We store your name and email address used for registration.</li>\n" +
    "        </ul>\n" +
    "\n" +
    "        <h3>Third party service that use personal data</h3>\n" +
    "        <ul>\n" +
    "            <li>Mandrill (from Mailchimp) - the mail server used to send the reminders</li>\n" +
    "            <li>Mixpanel - used to track actions with the purpose of improving the application&#39;s user experience</li>\n" +
    "            <li>Reamaze - used to manage the conversations with our users</li>\n" +
    "        </ul>\n" +
    "\n" +
    "        <h1>Privacy Policy</h1>\n" +
    "        <ul>\n" +
    "            <li>The information Reme stores is the subject of the reminder and the e-mail address(es) the user enters for the reminder recipient.</li>\n" +
    "            <li>We use local storage to save reminder related data for better user-experience. We do not collect anonymous data of any kind.</li>\n" +
    "            <li>The only e-mail Reme will send to the provided address(es) as recipients will be the reminder which the user creates.</li>\n" +
    "            <li>We will only use your email address(es) to send the reminders you create or for Reme related notifications.</li>\n" +
    "            <li>We will not use your email address to send newsletters or advertising that you didn&#39;t subscribe to.</li>\n" +
    "            <li>We will not share your e-mail address or the e-mail address(es) you used for other recipients with 3rd party entities in the scope of advertising or spam.</li>\n" +
    "        </ul>\n" +
    "\n" +
    "        <p>We may change the Privacy policy and/or the Terms of use without notice.</p>\n" +
    "\n" +
    "        <h3>Contact</h3>\n" +
    "\n" +
    "        <p>Please feel free to contact us at hello@reme.io for any questions or concerns you may have regarding the terms of use or the privacy policy.</p>\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "<div footer-home class=\"view-container__footer footer-about\"></div>");
}]);

angular.module("app/reminders/partials/reminder/reminder.list.template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/reminders/partials/reminder/reminder.list.template.html",
    "<!--Reminder list is empty-->\n" +
    "<div class=\"reminder__empty empty-state--text\" ng-class=\"{'reminder__empty--revived':firstReminderCreated}\" ng-if=\"isReminderListEmpty\">\n" +
    "    You have no reminders. Don't be shy, go ahead and create one! :)\n" +
    "</div>\n" +
    "\n" +
    "<!--Search in reminder list-->\n" +
    "<div class=\"form-group form-group--search\">\n" +
    "    <input class=\"form-control\" type=\"text\" placeholder=\"Search\" name=\"text\" maxlength=\"140\" ng-model=\"searchByText\" />\n" +
    "</div>\n" +
    "\n" +
    "<!--Reminder list-->\n" +
    "<div class=\"reminder\"\n" +
    "     ng-click=\"openUpdateReminderModalService(reminder, $index)\"\n" +
    "     ng-class=\"{ 'reminder--first': $first,\n" +
    "                 'reminder--removed': removedReminderIndex === $index,\n" +
    "                 'reminder--loaded': $index > defaultRemindersLimit - 1 ,\n" +
    "                 'reminder--last': $index === remindersLimit - 1,\n" +
    "                 'reminder--filter-activated': isSearchByActivated(),\n" +
    "                 'reminder--owner': reminder.isCreatedBy(currentUserEmail) }\"\n" +
    "     ng-repeat=\"reminder in reminders | orderObjectBy : 'dueOn' : true | limitTo:remindersLimit | filter:{model:{text:searchByText}} as filteredReminders\">\n" +
    "\n" +
    "    <!--Reminder title-->\n" +
    "    <div class=\"reminder__title\" ng-bind-html=\"reminder.model.text | highlightSearch:searchByText\"></div>\n" +
    "\n" +
    "    <!--Reminder edit/delete-->\n" +
    "    <div class=\"reminder__menu\">\n" +
    "        <a class=\"reminder__menu__option reminder__menu__option--delete simptip-position-left simptip-fade simptip-smooth\" data-tooltip=\"Delete reminder\" href=\"javascript:void(0)\" ng-click=\"reminder.isCreatedBy(currentUserEmail) ? openDeleteReminderModalService(reminder, $index) : openUnSubscribeReminderModalService(reminder, $index); $event.stopPropagation();\"><span class=\"icon-trash\"></span></a>\n" +
    "    </div>\n" +
    "\n" +
    "    <!--Reminder info-->\n" +
    "    <div class=\"reminder__info\">\n" +
    "\n" +
    "        <!--Reminder date-->\n" +
    "        <div class=\"reminder__info__item reminder__info__item--date\">\n" +
    "            <span class=\"icon-calendar\"></span>\n" +
    "            {{reminder.model.dueOn | friendlyDate}}\n" +
    "        </div>\n" +
    "\n" +
    "        <!--Reminder hour-->\n" +
    "        <div class=\"reminder__info__item reminder__info__item--time\">\n" +
    "            <span class=\"icon-clock\"></span>\n" +
    "            {{reminder.model.dueOn | friendlyHour}}\n" +
    "        </div>\n" +
    "\n" +
    "        <!--Reminder icons-->\n" +
    "        <div class=\"reminder__info__item reminder__info__item--additional\">\n" +
    "            <div class=\"reminder__info__item__icon reminder__info__item__icon--user\">\n" +
    "                <span ng-if=\"! reminder.isCreatedBy(currentUserEmail)\" class=\"simptip-position-bottom simptip-fade simptip-smooth simptip-multiline\" data-tooltip=\"Created by: {{reminder.model.createdByUser.firstName}} {{reminder.model.createdByUser.lastName}} {{reminder.model.createdByUser.email}}\">\n" +
    "                    <span class=\"icon-user\"></span>\n" +
    "                </span>\n" +
    "            </div>\n" +
    "            <div class=\"reminder__info__item__icon reminder__info__item__icon--email\">\n" +
    "                <span ng-if=\"reminder.isManyRecipients()\" class=\"simptip-position-bottom simptip-fade simptip-smooth simptip-multiline\" data-tooltip=\"Recipients: {{reminder.model.recipients | friendlyRecipients}}\">\n" +
    "                    <span class=\"icon-email\"></span>\n" +
    "                </span>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "</div>\n" +
    "\n" +
    "<div ng-if=\"filteredReminders.length >= defaultRemindersLimit && isStillRemindersToBeLoaded()\" class=\"load-more-reminders\">\n" +
    "    <button type=\"submit\" ladda=\"isLoadingMore\" data-style=\"expand-left\" data-spinner-size=\"20\" class=\"btn btn--load-more\" ng-click=\"loadMoreReminders()\">LOAD MORE</button>\n" +
    "</div>");
}]);

angular.module("app/reminders/partials/reminder/reminders.action.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/reminders/partials/reminder/reminders.action.html",
    "<div class=\"reminders__header\">\n" +
    "    <button class=\"btn btn-complement reminders__header__btn\" ng-click=\"openReminderModalService()\">New reminder</button>\n" +
    "</div>");
}]);

angular.module("app/reminders/partials/reminder/reminders.list.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/reminders/partials/reminder/reminders.list.html",
    "<tabset>\n" +
    "    <tab heading=\"Upcoming\" active=\"reminderTabs.upcomingRemindersTabActive\">\n" +
    "        <div class=\"reminder-list\" reminder-list reminders=\"upcomingReminders\"></div>\n" +
    "    </tab>\n" +
    "\n" +
    "    <tab heading=\"Past\" active=\"reminderTabs.pastRemindersTabActive\">\n" +
    "        <div class=\"reminder-list\" reminder-list reminders=\"pastReminders\"></div>\n" +
    "    </tab>\n" +
    "</tabset>");
}]);

angular.module("app/reminders/partials/reminder/reminders.template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/reminders/partials/reminder/reminders.template.html",
    "<div class=\"view-container__header\" header></div>\n" +
    "\n" +
    "<div class=\"centered-section-reminders\">\n" +
    "\n" +
    "    <div ui-view=\"action\"></div>\n" +
    "\n" +
    "    <div ui-view=\"list\"></div>\n" +
    "\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"view-container__footer\" footer></div>");
}]);

angular.module("app/reminders/partials/reminderModal/reminder_create_update_modal.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/reminders/partials/reminderModal/reminder_create_update_modal.html",
    "<!--Reminder form-->\n" +
    "<div class=\"reminder-modal\">\n" +
    "\n" +
    "    <div class=\"reminder-modal__form__cancel\">\n" +
    "        <button type=\"button\" class=\"close\" ng-click=\"dismissCurrentOpenedModal()\" aria-label=\"Close\">\n" +
    "            <span aria-hidden=\"true\">×</span></button>\n" +
    "    </div>\n" +
    "\n" +
    "    <!-- Flash messages. -->\n" +
    "    <div flash-messages flash=\"flash\" identifier-id=\"{{alertIdentifierId}}\"></div>\n" +
    "\n" +
    "    <!--Reminder form-->\n" +
    "    <form class=\"reminder-modal__form\" name=\"reminderForm\" ng-submit=\"saveReminder(reminderForm)\" novalidate focus-first-error>\n" +
    "\n" +
    "        <!--Reminder text-->\n" +
    "        <div class=\"form-group form-group--reminder-text\" ng-class=\"{'has-error': reminderForm.text.$invalid && reminderForm.$submitted}\">\n" +
    "            <label>Remind me to:</label>\n" +
    "            <input class=\"form-control form-control--reminder\" type=\"text\" placeholder=\"e.g. {{randomExample}}\" name=\"text\" maxlength=\"140\" ng-model=\"reminder.model.text\" nlp-date date=\"reminder.model.dueOn\" separator=\"@\" min-date=\"{{minDate}}\" max-date=\"2018-01-01\" auto-focus=\"isModalOpened\" required />\n" +
    "        </div>\n" +
    "\n" +
    "        <!--Reminder info-->\n" +
    "        <div class=\"reminder-modal__form__info\" ng-class=\"{'has-error': reminderForm.selectedDate.$invalid}\">\n" +
    "\n" +
    "            <!--Hidden input of the reminder chosen date-->\n" +
    "            <input type=\"hidden\" name=\"selectedDate\" ng-model=\"reminder.model.dueOn\" valid-date />\n" +
    "\n" +
    "            <!--Reminder date picker-->\n" +
    "            <div class=\"reminder-modal__form__info--date\">\n" +
    "                <button type=\"button\" class=\"btn btn--reminder-popup\" datepicker-popup min=\"minDate\" ng-model=\"reminder.model.dueOn\" show-weeks=\"false\" datepicker-options=\"{starting_day:1}\" animate animate-on=\"nlpDate:dateChange\" animate-class=\"highlight-button\"> {{reminder.model.dueOn | friendlyDate}}</button>\n" +
    "            </div>\n" +
    "\n" +
    "            <!--Reminder time picker-->\n" +
    "            <div class=\"reminder-modal__form__info--time\" timepicker-popup dropdown ng-model=\"reminder.model.dueOn\" step=\"30\"></div>\n" +
    "\n" +
    "            <!--Error messages-->\n" +
    "            <div class=\"has-error-messages\" ng-messages=\"reminderForm.selectedDate.$error\">\n" +
    "                <div ng-message=\"validDate\">Please make sure that the date and time are in the future.</div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <!--Reminder addresses-->\n" +
    "        <div class=\"reminder-modal__form__addressees\">\n" +
    "\n" +
    "            <div email-list ng-model=\"reminder.model.recipients\" max-emails=\"6\" parent-form=\"reminderForm\"></div>\n" +
    "        </div>\n" +
    "\n" +
    "        <!--Submit form button-->\n" +
    "        <button type=\"submit\" ladda=\"isSaving\" data-style=\"expand-left\" data-spinner-size=\"20\" class=\"btn btn--create-reminder\">{{isNew ? \"Create reminder\" : \"Update reminder\"}}</button>\n" +
    "    </form>\n" +
    "</div>");
}]);

angular.module("app/reminders/partials/reminderModal/reminder_delete_modal.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/reminders/partials/reminderModal/reminder_delete_modal.html",
    "<!--Delete reminder form-->\n" +
    "<div class=\"reminder-form-container\">\n" +
    "\n" +
    "    <div class=\"reminder-form-container__form\">\n" +
    "        <div class=\"reminder-form-container__form__question\">\n" +
    "            Don't you need to remember to <strong>{{reminder.model.text}}</strong> on\n" +
    "            <strong>{{reminder.model.dueOn | friendlyDate}}</strong> anymore?\n" +
    "        </div>\n" +
    "        <div class=\"reminder-form-container__form__recommend\">\n" +
    "            <a href=\"javascript:void(0)\" ng-click=\"dismiss()\">Keep calm and don't delete it!</a>\n" +
    "        </div>\n" +
    "        <button type=\"submit\" ladda=\"isDeleting\" data-style=\"expand-left\" data-spinner-size=\"20\" class=\"btn btn--delete-reminder\" ng-click=\"reminder.isCreatedBy(user.model.email) ? deleteReminderAndClose(reminder) : unSubscribeFromReminderAndClose(reminder)\">Don't need it anymore</button>\n" +
    "    </div>\n" +
    "\n" +
    "</div>");
}]);

angular.module("app/account/partials/account.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/account/partials/account.html",
    "<!-- Account sections -->\n" +
    "<div class=\"account__sections\" account-form-toggle>\n" +
    "\n" +
    "    <!--Sign in-->\n" +
    "    <div class=\"account__section\" ng-if=\"AccountFormToggle.state === ACCOUNT_FORM_STATE.login\" ng-controller=\"LoginCtrl\">\n" +
    "\n" +
    "        <!-- Title -->\n" +
    "        <h1 class=\"account__title\">Welcome!</h1>\n" +
    "\n" +
    "        <!-- Login form -->\n" +
    "        <form name=\"loginForm\" ng-submit=\"login(loginData)\" novalidate focus-first-error>\n" +
    "\n" +
    "            <!-- Account controls -->\n" +
    "            <div class=\"account__controls\">\n" +
    "\n" +
    "                <!-- Flash messages. -->\n" +
    "                <div flash-messages flash=\"flash\" identifier-id=\"{{alertIdentifierId}}\"></div>\n" +
    "\n" +
    "                <!-- Form groups -->\n" +
    "                <div class=\"account__controls__form-groups--last\">\n" +
    "\n" +
    "                    <!-- Form group -->\n" +
    "                    <div class=\"form-group\" ng-class=\"{'has-error': loginForm.$submitted && (loginForm.email.$invalid || badPostSubmitResponse)}\">\n" +
    "                        <input class=\"form-control form-control--account\" type=\"email\" placeholder=\"email\" name=\"email\" ng-model=\"loginData.email\" auto-focus required />\n" +
    "                        <span class=\"help-message\" ng-if=\"loginForm.email.$invalid && loginForm.$submitted\">Your email address is mandatory.</span>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <!-- Form group -->\n" +
    "                    <div class=\"form-group\" ng-class=\"{'has-error': loginForm.$submitted && (loginForm.password.$invalid || badPostSubmitResponse)}\">\n" +
    "                        <input class=\"form-control form-control--account\" type=\"password\" placeholder=\"password\" name=\"password\" ng-model=\"loginData.password\" required />\n" +
    "                        <span class=\"help-message\" ng-if=\"loginForm.password.$invalid && loginForm.$submitted\">Your password is mandatory.</span>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "\n" +
    "                <!-- Reset password -->\n" +
    "                <div class=\"form-group\">\n" +
    "                    <a class=\"link-secondary link--lg-middle\" href=\"javascript:void(0)\" ng-click=\"AccountFormToggle.setState(ACCOUNT_FORM_STATE.forgotPassword)\">Forgot login details?</a>\n" +
    "                </div>\n" +
    "\n" +
    "                <!-- Button container -->\n" +
    "                <button ladda=\"isRequestPending\" data-style=\"expand-left\" data-spinner-size=\"20\" class=\"btn account__button\" type=\"submit\">Sign in</button>\n" +
    "            </div>\n" +
    "        </form>\n" +
    "\n" +
    "        <a class=\"link-primary link--lg\" href=\"javascript:void(0)\" ng-click=\"AccountFormToggle.setState(ACCOUNT_FORM_STATE.requestSignUpRegistration)\">Don't have an account yet? Sign up!</a>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "    <!--Sign up-->\n" +
    "    <div class=\"account__section\" ng-if=\"AccountFormToggle.state == ACCOUNT_FORM_STATE.requestSignUpRegistration\" ng-controller=\"RequestSignUpRegistrationCtrl\">\n" +
    "\n" +
    "        <!-- Title -->\n" +
    "        <h1 class=\"account__title\">Let's get you started!</h1>\n" +
    "\n" +
    "        <!-- Sign-up form -->\n" +
    "        <form name=\"requestSignUpRegistrationForm\" ng-submit=\"requestSignUpRegistration()\" novalidate focus-first-error>\n" +
    "\n" +
    "            <!-- Account controls -->\n" +
    "            <div class=\"account__controls\">\n" +
    "\n" +
    "                <!-- Flash messages. -->\n" +
    "                <div flash-messages flash=\"flash\" identifier-id=\"{{alertIdentifierId}}\"></div>\n" +
    "\n" +
    "                <!-- Form groups -->\n" +
    "                <div class=\"account__controls__form-groups--last\">\n" +
    "\n" +
    "                    <!-- Form group -->\n" +
    "                    <div class=\"form-group\" ng-class=\"{'has-error': requestSignUpRegistrationForm.email.$invalid && requestSignUpRegistrationForm.$submitted}\">\n" +
    "                        <input class=\"form-control form-control--account\" type=\"email\" placeholder=\"Your email address\" name=\"email\" ng-model=\"requestSignUpRegistrationData.email\" auto-focus required valid-email unique-email />\n" +
    "\n" +
    "                        <!-- Error messages -->\n" +
    "                        <div class=\"home__signup__sections__section__validation-messages\" ng-class=\"{'has-error': requestSignUpRegistrationForm.email.$invalid && requestSignUpRegistrationForm.$submitted}\" ng-messages=\"requestSignUpRegistrationForm.email.$error\" ng-if=\"requestSignUpRegistrationForm.$submitted\">\n" +
    "                            <div ng-message=\"required\">Your email address is mandatory.</div>\n" +
    "                            <div ng-message=\"validEmail\">This email address is not valid.</div>\n" +
    "                            <div ng-message=\"uniqueEmail\">This email address is already used.</div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "\n" +
    "                <!-- Button container -->\n" +
    "                <button class=\"btn account__button\" ladda=\"isRequestPending\" data-style=\"expand-left\" data-spinner-size=\"20\" type=\"submit\">Create new account</button>\n" +
    "            </div>\n" +
    "        </form>\n" +
    "\n" +
    "        <a class=\"link-primary link--lg\" href=\"javascript:void(0)\" ng-click=\"AccountFormToggle.setState(ACCOUNT_FORM_STATE.login)\">Already have an account? Sign in here!</a>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "    <!-- Sign up email sent section -->\n" +
    "    <div class=\"account__section\" ng-if=\"AccountFormToggle.state == ACCOUNT_FORM_STATE.requestSignUpRegistrationEmailSent\">\n" +
    "\n" +
    "        <!-- Title -->\n" +
    "        <h1 class=\"account__title\">Yey! Email has been sent!</h1>\n" +
    "\n" +
    "        <!-- Explain -->\n" +
    "        <span class=\"account__explain\">Please check your email to finish your account creation.</span>\n" +
    "\n" +
    "        <!-- Button container -->\n" +
    "        <a href=\"javascript:void(0)\" class=\"link-secondary link--lg\" ng-click=\"AccountFormToggle.setState(ACCOUNT_FORM_STATE.requestSignUpRegistration)\">I think I've misspelled my email</a>\n" +
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
    "        <form name=\"forgotPasswordForm\" ng-submit=\"requestPasswordReset(forgotPasswordData.email)\" novalidate focus-first-error>\n" +
    "\n" +
    "            <!-- Account controls -->\n" +
    "            <div class=\"account__controls\">\n" +
    "\n" +
    "                <!-- Flash messages. -->\n" +
    "                <div flash-messages flash=\"flash\" identifier-id=\"{{alertIdentifierId}}\"></div>\n" +
    "\n" +
    "                <!-- Form groups -->\n" +
    "                <div class=\"account__controls__form-groups--last\">\n" +
    "\n" +
    "                    <!-- Form group -->\n" +
    "                    <div class=\"form-group\" ng-class=\"{'has-error': forgotPasswordForm.email.$invalid && forgotPasswordForm.$submitted }\">\n" +
    "                        <input class=\"form-control form-control--account\" type=\"email\" placeholder=\"Your email address\" name=\"email\" ng-model=\"forgotPasswordData.email\" auto-focus required valid-email />\n" +
    "\n" +
    "                        <div class=\"help-message\" ng-messages=\"forgotPasswordForm.email.$error\" ng-if=\"forgotPasswordForm.$submitted\">\n" +
    "                            <div ng-message=\"required\">Your email address is mandatory.</div>\n" +
    "                            <div ng-message=\"validEmail\">This email address is not valid.</div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "\n" +
    "                <!-- Button container -->\n" +
    "                <button class=\"btn account__button\" type=\"submit\">Reset password</button>\n" +
    "            </div>\n" +
    "        </form>\n" +
    "\n" +
    "        <a href=\"javascript:void(0)\" class=\"link-secondary link--lg\" ng-click=\"AccountFormToggle.setState(ACCOUNT_FORM_STATE.login)\">Nevermind, take me back!</a>\n" +
    "    </div>\n" +
    "\n" +
    "    <!-- Password recovery email sent section -->\n" +
    "    <div class=\"account__section\" ng-if=\"AccountFormToggle.state == ACCOUNT_FORM_STATE.forgotPasswordEmailSent\">\n" +
    "\n" +
    "        <!-- Title -->\n" +
    "        <h1 class=\"account__title\">Email has been sent!</h1>\n" +
    "\n" +
    "        <!-- Explain -->\n" +
    "        <span class=\"account__explain\">Please check your email. We've sent you a link to reset your password.</span>\n" +
    "\n" +
    "        <!-- Button container -->\n" +
    "        <a href=\"javascript:void(0)\" class=\"link-secondary link--lg\" ng-click=\"AccountFormToggle.setState(ACCOUNT_FORM_STATE.login)\">Actually I remember the password</a>\n" +
    "    </div>\n" +
    "\n" +
    "</div>");
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
    "               Logged out successfully.\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "");
}]);

angular.module("app/account/partials/settings/settings.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/account/partials/settings/settings.html",
    "<div header class=\"view-container__header\"></div>\n" +
    "\n" +
    "<div class=\"centered-section-account\">\n" +
    "    <tabset vertical=\"true\">\n" +
    "        <tab heading=\"Profile\">\n" +
    "            <div class=\"account__sections\" ui-view=\"profile\" profile-form-toggle></div>\n" +
    "        </tab>\n" +
    "        <tab heading=\"Preferences\">\n" +
    "            <div class=\"account__sections\" ui-view=\"preferences\"></div>\n" +
    "        </tab>\n" +
    "    </tabset>\n" +
    "</div>\n" +
    "\n" +
    "<div footer class=\"view-container__footer\"></div>");
}]);

angular.module("app/account/partials/settings/settings.preferences.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/account/partials/settings/settings.preferences.html",
    "<!-- Profile section -->\n" +
    "<div class=\"account__section\" ng-controller=\"PreferencesCtrl\">\n" +
    "\n" +
    "    <!-- Title -->\n" +
    "    <h1 class=\"account__title\">Modify timezone</h1>\n" +
    "\n" +
    "    <!-- Profile form -->\n" +
    "    <form name=\"preferencesForm\" ng-submit=\"updatePreferences(preferencesData)\" novalidate>\n" +
    "\n" +
    "        <!-- Account controls -->\n" +
    "        <div class=\"account__controls\">\n" +
    "\n" +
    "            <!-- Flash messages. -->\n" +
    "            <div flash-messages flash=\"flash\" identifier-id=\"{{alertIdentifierId}}\"></div>\n" +
    "\n" +
    "            <!-- Form groups -->\n" +
    "            <div class=\"account__controls__form-groups account__controls__form-groups--last\">\n" +
    "\n" +
    "                <!-- Form group -->\n" +
    "                <div class=\"form-group form-group--timezone\" ng-class=\"{'has-error': preferencesForm.timezone.$invalid && preferencesForm.$submitted}\">\n" +
    "                    <select class=\"form-control\" chosen=\"{inherit_select_classes:true}\" ng-options=\"timezone.key as timezone.value for timezone in timezones\" ng-model=\"preferencesData.timezone\" required> </select>\n" +
    "                    <span class=\"help-message\" ng-if=\"preferencesForm.timezone.$invalid && preferencesForm.$submitted\">Please tell us your email.</span>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <!-- Button container -->\n" +
    "            <button class=\"btn account__button\" type=\"submit\">Save changes</button>\n" +
    "        </div>\n" +
    "    </form>\n" +
    "</div>");
}]);

angular.module("app/account/partials/settings/settings.profile.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/account/partials/settings/settings.profile.html",
    "<!-- Profile section -->\n" +
    "<div class=\"account__section\" ng-if=\"ProfileFormToggle.state === ACCOUNT_FORM_STATE.updateProfile\" ng-controller=\"ProfileCtrl\">\n" +
    "\n" +
    "    <!-- Title -->\n" +
    "    <h1 class=\"account__title\">Modify profile</h1>\n" +
    "\n" +
    "    <!-- Profile form -->\n" +
    "    <form name=\"profileForm\" ng-submit=\"updateProfile(profileData)\" novalidate>\n" +
    "\n" +
    "        <!-- Account controls -->\n" +
    "        <div class=\"account__controls\">\n" +
    "\n" +
    "            <!-- Flash messages. -->\n" +
    "            <div flash-messages flash=\"flash\" identifier-id=\"{{alertIdentifierId}}\"></div>\n" +
    "\n" +
    "            <!-- Form groups -->\n" +
    "            <div class=\"account__controls__form-groups account__controls__form-groups--last\">\n" +
    "\n" +
    "                <!-- Form group -->\n" +
    "                <div class=\"form-group\" ng-class=\"{'has-error': profileForm.firstName.$invalid && profileForm.$submitted}\">\n" +
    "                    <input class=\"form-control form-control--account\" type=\"text\" placeholder=\"Prenume\" name=\"firstName\" ng-model=\"profileData.firstName\" required />\n" +
    "                    <span class=\"help-message\" ng-if=\"profileForm.firstName.$invalid && profileForm.$submitted\">Please tell us your First Name.</span>\n" +
    "                </div>\n" +
    "\n" +
    "                <!-- Form group -->\n" +
    "                <div class=\"form-group\" ng-class=\"{'has-error': profileForm.lastName.$invalid && profileForm.$submitted}\">\n" +
    "                    <input class=\"form-control form-control--account\" type=\"text\" placeholder=\"Nume\" name=\"lastName\" ng-model=\"profileData.lastName\" required />\n" +
    "                    <span class=\"help-message\" ng-if=\"profileForm.lastName.$invalid && profileForm.$submitted\">Please tell us your Last Name.</span>\n" +
    "                </div>\n" +
    "\n" +
    "                <!-- Form group -->\n" +
    "                <div class=\"form-group\">\n" +
    "                    <input class=\"form-control form-control--account\" type=\"text\" placeholder=\"Email\" name=\"email\" ng-value=\"user.model.email\" disabled />\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <!-- Button container -->\n" +
    "            <button class=\"btn account__button\" type=\"submit\">Save changes</button>\n" +
    "        </div>\n" +
    "    </form>\n" +
    "\n" +
    "    <a href=\"javascript:void(0)\" class=\"link-secondary link--lg\" ng-click=\"ProfileFormToggle.setState(ACCOUNT_FORM_STATE.updatePassword)\">Change password</a>\n" +
    "</div>\n" +
    "\n" +
    "<!-- Update password section -->\n" +
    "<div class=\"account__section\" ng-if=\"ProfileFormToggle.state === ACCOUNT_FORM_STATE.updatePassword\" ng-controller=\"UpdatePasswordCtrl\">\n" +
    "\n" +
    "    <!-- Title -->\n" +
    "    <h1 class=\"account__title\">Welcome!</h1>\n" +
    "\n" +
    "    <!-- Update password form -->\n" +
    "    <form name=\"updatePasswordForm\" ng-submit=\"updatePassword(updatePasswordData)\" novalidate>\n" +
    "\n" +
    "        <!-- Account controls -->\n" +
    "        <div class=\"account__controls\">\n" +
    "\n" +
    "            <!-- Flash messages. -->\n" +
    "            <div flash-messages flash=\"flash\" identifier-id=\"{{alertIdentifierId}}\"></div>\n" +
    "\n" +
    "            <!-- Form groups -->\n" +
    "            <div class=\"account__controls__form-groups--last\">\n" +
    "\n" +
    "                <!-- Form group -->\n" +
    "                <div class=\"form-group\" ng-class=\"{'has-error': updatePasswordForm.$submitted && (updatePasswordForm.oldPassword.$invalid || badPostSubmitResponse)}\">\n" +
    "                    <input class=\"form-control form-control--account\" type=\"password\" placeholder=\"Old password\" name=\"oldPassword\" ng-model=\"updatePasswordData.oldPassword\" auto-focus required />\n" +
    "                    <span class=\"help-message\" ng-if=\"updatePasswordForm.oldPassword.$invalid && updatePasswordForm.$submitted\">Please enter your old password.</span>\n" +
    "                </div>\n" +
    "\n" +
    "                <!-- Form group -->\n" +
    "                <div class=\"form-group\" ng-class=\"{'has-error': updatePasswordForm.$submitted && (updatePasswordForm.newPassword.$invalid || badPostSubmitResponse)}\">\n" +
    "                    <input class=\"form-control form-control--account\" type=\"password\" placeholder=\"New password\" name=\"newPassword\" ng-model=\"updatePasswordData.newPassword\" required />\n" +
    "                    <span class=\"help-message\" ng-if=\"updatePasswordForm.newPassword.$invalid && updatePasswordForm.$submitted\">Please enter a new password.</span>\n" +
    "                </div>\n" +
    "\n" +
    "                <!-- Form group -->\n" +
    "                <div class=\"form-group\" ng-class=\"{'has-error': updatePasswordForm.$submitted && (updatePasswordForm.newPasswordConfirmation.$invalid || badPostSubmitResponse)}\">\n" +
    "                    <input class=\"form-control form-control--account\" type=\"password\" placeholder=\"New password confirmation\" name=\"newPasswordConfirmation\" ng-model=\"updatePasswordData.newPasswordConfirmation\" required />\n" +
    "                    <span class=\"help-message\" ng-if=\"updatePasswordForm.newPasswordConfirmation.$invalid && updatePasswordForm.$submitted\">Please confirm your new password.</span>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <!-- Button container -->\n" +
    "            <button class=\"btn account__button\" type=\"submit\">Update password</button>\n" +
    "        </div>\n" +
    "    </form>\n" +
    "\n" +
    "    <a href=\"javascript:void(0)\" class=\"link-secondary link--lg\" ng-click=\"ProfileFormToggle.setState(ACCOUNT_FORM_STATE.updateProfile)\">Nevermind, take me back!</a>\n" +
    "\n" +
    "</div>\n" +
    "\n" +
    "<!-- Change password section successfully-->\n" +
    "<div class=\"account__section\" ng-if=\"ProfileFormToggle.state == ACCOUNT_FORM_STATE.updatePasswordSuccessfully\">\n" +
    "\n" +
    "    <!-- Title -->\n" +
    "    <h1 class=\"account__title\">Successfully</h1>\n" +
    "\n" +
    "    <!-- Explain -->\n" +
    "    <span class=\"account__explain\">We've successfully updated your new password.</span>\n" +
    "\n" +
    "    <!-- Button container -->\n" +
    "    <a href=\"javascript:void(0)\" ng-click=\"ProfileFormToggle.setState(ACCOUNT_FORM_STATE.updateProfile)\">Continue</a>\n" +
    "</div>");
}]);

angular.module("app/account/partials/signup_confirm_abstract.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/account/partials/signup_confirm_abstract.html",
    "<div ui-view></div>");
}]);

angular.module("app/account/partials/signup_confirm_invalid.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/account/partials/signup_confirm_invalid.html",
    "<!-- Registration confirmation invalid -->\n" +
    "<div class=\"account__sections\">\n" +
    "\n" +
    "    <div class=\"account__section\">\n" +
    "\n" +
    "        <!-- Explain -->\n" +
    "        <span class=\"account__explain\">\n" +
    "            Sorry, we couldn't validate your email. Maybe the link in the email is too old..\n" +
    "        </span>\n" +
    "        <a href=\"javascript:void(0)\" class=\"link-secondary link--lg\" ng-click=\"goHome()\">Request the email again</a>\n" +
    "    </div>\n" +
    "\n" +
    "</div>\n" +
    "");
}]);

angular.module("app/account/partials/signup_confirm_valid.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/account/partials/signup_confirm_valid.html",
    "<!-- Registration confirmation valid -->\n" +
    "\n" +
    "<!-- Account sections -->\n" +
    "<div class=\"account__sections\">\n" +
    "\n" +
    "    <!--Sign up-->\n" +
    "    <div class=\"account__section\">\n" +
    "\n" +
    "        <!-- Title -->\n" +
    "        <h1 class=\"account__title\">Let's finalize your account!</h1>\n" +
    "\n" +
    "        <!-- Sign-up form -->\n" +
    "        <form name=\"signUpForm\" ng-submit=\"signUp(signUpData)\" novalidate focus-first-error>\n" +
    "\n" +
    "            <!-- Account controls -->\n" +
    "            <div class=\"account__controls\">\n" +
    "\n" +
    "                <!-- Flash messages. -->\n" +
    "                <div flash-messages flash=\"flash\" identifier-id=\"{{alertIdentifierId}}\"></div>\n" +
    "\n" +
    "                <!-- Form groups -->\n" +
    "                <div class=\"form-group\" ng-class=\"{'has-error': signUpForm.$submitted && (signUpForm.firstName.$invalid || badPostSubmitResponse)}\">\n" +
    "                    <input class=\"form-control form-control--account\" type=\"text\" placeholder=\"First Name\" name=\"firstName\" ng-model=\"signUpData.firstName\" auto-focus required />\n" +
    "                    <span class=\"help-message\" ng-if=\"signUpForm.firstName.$invalid && signUpForm.$submitted\">Please tell us your First Name.</span>\n" +
    "                </div>\n" +
    "\n" +
    "                <!-- Form group -->\n" +
    "                <div class=\"form-group\" ng-class=\"{'has-error': signUpForm.$submitted && (signUpForm.lastName.$invalid || badPostSubmitResponse)}\">\n" +
    "                    <input class=\"form-control form-control--account\" type=\"text\" placeholder=\"Last Name\" name=\"lastName\" ng-model=\"signUpData.lastName\" required />\n" +
    "                    <span class=\"help-message\" ng-if=\"signUpForm.lastName.$invalid && signUpForm.$submitted\">Please tell us your Last Name.</span>\n" +
    "                </div>\n" +
    "\n" +
    "                <!-- Form groups -->\n" +
    "                <div class=\"account__controls__form-groups--medium-offset\">\n" +
    "\n" +
    "                    <!-- Form group -->\n" +
    "                    <div class=\"form-group form-group--small-offset\" ng-class=\"{'has-error': signUpForm.$submitted && (signUpForm.password.$invalid || badPostSubmitResponse)}\">\n" +
    "                        <input class=\"form-control form-control--account\" type=\"password\" placeholder=\"Choose a password\" name=\"password\" ng-model=\"signUpData.password\" required strong-password />\n" +
    "\n" +
    "                        <div class=\"help-message\" ng-messages=\"signUpForm.password.$error\" ng-if=\"signUpForm.$submitted\">\n" +
    "                            <div ng-message=\"required\">Please choose a password.</div>\n" +
    "                            <div ng-message=\"strongPassword\">Your password needs to be at least 7 characters long.</div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "\n" +
    "                <div class=\"account__controls__form__info\">\n" +
    "                    <div class=\"account__controls__form__info__left\">Timezone</div>\n" +
    "                    <div class=\"account__controls__form__info__right simptip-position-bottom simptip-fade simptip-smooth simptip-multiline\" data-tooltip=\"We automatically detected your timezone. You can change this later in the Settings page.\">{{timezoneDetails.value}}</div>\n" +
    "                </div>\n" +
    "\n" +
    "                <!-- Button container -->\n" +
    "                <button class=\"btn account__button\" type=\"submit\">Create new account</button>\n" +
    "            </div>\n" +
    "        </form>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"account__section__terms\">\n" +
    "        * By singing up you agree to our\n" +
    "        <a href=\"javascript:void(0)\" ui-sref=\"privacy\" class=\"account__section__terms__link\">Terms and Privacy policy</a>\n" +
    "    </div>\n" +
    "\n" +
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
    "    <a href=\"javascript:void(0)\" ng-click=\"continueToResetPassword()\">Let me try again.</a>\n" +
    "    <br />\n" +
    "    <span ng-if=\"isUserAuthenticated\">\n" +
    "        You are authenticated. You will be logged off if you want to try again.\n" +
    "    </span>\n" +
    "</div>");
}]);

angular.module("app/account/partials/validate_password_reset_token_valid.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/account/partials/validate_password_reset_token_valid.html",
    "<!-- Validate password reset token section -->\n" +
    "<div class=\"account__section\" ng-hide=\"successfullyReseted\">\n" +
    "\n" +
    "    <!-- Title -->\n" +
    "    <h1 class=\"account__title\">Reset your password.</h1>\n" +
    "\n" +
    "    <!-- Reset password form -->\n" +
    "    <form name=\"resetPasswordForm\" ng-submit=\"resetPassword(resetPasswordData)\" novalidate>\n" +
    "\n" +
    "        <!-- Account controls -->\n" +
    "        <div class=\"account__controls\">\n" +
    "\n" +
    "            <!-- Flash messages. -->\n" +
    "            <div flash-messages flash=\"flash\" identifier-id=\"{{alertIdentifierId}}\"></div>\n" +
    "\n" +
    "            <!-- Form groups -->\n" +
    "            <div class=\"account__controls__form-groups--last\">\n" +
    "\n" +
    "                <!-- Form group -->\n" +
    "                <div class=\"form-group\" ng-class=\"{'has-error': resetPasswordForm.$submitted && (resetPasswordForm.password.$invalid || badPostSubmitResponse)}\">\n" +
    "                    <input class=\"form-control form-control--account\" type=\"password\" placeholder=\"New password\" name=\"password\" ng-model=\"resetPasswordData.password\" auto-focus required />\n" +
    "                    <span class=\"help-message\" ng-if=\"resetPasswordForm.password.$invalid && resetPasswordForm.$submitted\">Your new password is mandatory.</span>\n" +
    "                </div>\n" +
    "\n" +
    "                <!-- Form group -->\n" +
    "                <div class=\"form-group\" ng-class=\"{'has-error': resetPasswordForm.$submitted && (resetPasswordForm.passwordConfirmation.$invalid || badPostSubmitResponse)}\">\n" +
    "                    <input class=\"form-control form-control--account\" type=\"password\" placeholder=\"New password confirmation\" name=\"passwordConfirmation\" ng-model=\"resetPasswordData.passwordConfirmation\" required />\n" +
    "                    <span class=\"help-message\" ng-if=\"resetPasswordForm.passwordConfirmation.$invalid && resetPasswordForm.$submitted\">Your confirm password is mandatory.</span>\n" +
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
    "        We've successfully updated your password.\n" +
    "    </span>\n" +
    "</div>");
}]);

angular.module("app/common/partials/emailList/emailList.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/common/partials/emailList/emailList.html",
    "<div ng-repeat=\"email in emails track by $index\">\n" +
    "    <ng-form name=\"emailForm\">\n" +
    "        <div class=\"form-group form-group--email-icon\" ng-class=\"{'has-error': emailForm.email.$invalid && parentForm.$submitted}\">\n" +
    "\n" +
    "            <!--Inputs : first is your email-->\n" +
    "            <input class=\"form-control form-control--friend-email\" type=\"email\" placeholder=\"{{$index === 0 ? 'Your email' : 'Your friend\\'s email address'}}\" name=\"email\" ng-model=\"emails[$index].email\" required ng-disabled=\"$index === 0\" />\n" +
    "\n" +
    "            <!--Remove emails buttons-->\n" +
    "            <a href=\"javascript:void(0)\" ng-if=\"$index > 0\" class=\"close\" tabindex=\"-1\" ng-click=\"removeEmail($index)\">×</a>\n" +
    "        </div>\n" +
    "    </ng-form>\n" +
    "</div>\n" +
    "\n" +
    "<a class=\"btn-add-emails\" href=\"javascript:void(0)\" ng-click=\"addEmail()\" ng-show=\"canAddEmail\">Add another email recipient</a>");
}]);

angular.module("app/common/partials/flash-messages.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/common/partials/flash-messages.html",
    "<!-- Flash messages. -->\n" +
    "<div ng-attr-id=\"{{ identifierId }}\" flash-alert active-class=\"in alert\" class=\"alert--center fade\" duration=\"0\">\n" +
    "    <button type=\"button\" class=\"close\" ng-click=\"hide()\">&times;</button>\n" +
    "    <span class=\"alert-message\">{{flash.message}}</span>\n" +
    "</div>");
}]);

angular.module("app/common/partials/footer-home.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/common/partials/footer-home.html",
    "<div class=\"footer-home\">\n" +
    "    <div class=\"centered-section-home\">\n" +
    "\n" +
    "        <div class=\"footer__navbar\">\n" +
    "            <div class=\"footer__navbar__section-left\">\n" +
    "                <div class=\"footer__navbar__section-left__copyright\">\n" +
    "                    Made with <span class=\"icon-heart-2\"></span> in Cluj-Napoca.\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"footer__navbar__section-right\">\n" +
    "                <div class=\"footer__navbar__section-right__list footer__navbar__section-right__list--first\">\n" +
    "                    <ul>\n" +
    "                        <li><a href=\"javascript:void(0)\" ui-sref=\"about\">About</a></li>\n" +
    "                        <li><a href=\"javascript:void(0)\">Press kit</a></li>\n" +
    "                        <li><a href=\"javascript:void(0)\" ui-sref=\"privacy\">Privacy and Terms</a></li>\n" +
    "                    </ul>\n" +
    "                </div>\n" +
    "                <div class=\"footer__navbar__section-right__list\">\n" +
    "                    <ul>\n" +
    "                        <li><a href=\"https://twitter.com/reme_io\">Twitter</a></li>\n" +
    "                        <li><a href=\"https://www.facebook.com/reme.io\">Facebook</a></li>\n" +
    "                        <li><a href=\"https://plus.google.com/+RemeIo\">Google+</a></li>\n" +
    "                    </ul>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("app/common/partials/footer.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/common/partials/footer.html",
    "<div class=\"footer\">\n" +
    "    <div class=\"centered-section-logged\">\n" +
    "\n" +
    "        <div class=\"footer__navbar\">\n" +
    "            <div class=\"footer__navbar__section-left\">\n" +
    "                <div class=\"footer__navbar__section-left__copyright\">\n" +
    "                    Made with <span class=\"icon-heart\"></span> in Cluj-Napoca.\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"footer__navbar__section-right\">\n" +
    "                <div class=\"footer__navbar__section-right__list\">\n" +
    "                    <ul>\n" +
    "                        <li><a href=\"javascript:void(0)\" ui-sref=\"about\">About</a></li>\n" +
    "                        <li><a href=\"javascript:void(0)\">Press kit</a></li>\n" +
    "                        <li><a href=\"javascript:void(0)\" ui-sref=\"privacy\">Privacy and Terms</a></li>\n" +
    "                    </ul>\n" +
    "                </div>\n" +
    "                <div class=\"footer__navbar__section-right__list\">\n" +
    "                    <ul>\n" +
    "                        <li><a href=\"https://twitter.com/reme_io\">Twitter</a></li>\n" +
    "                        <li><a href=\"https://www.facebook.com/reme.io\">Facebook</a></li>\n" +
    "                        <li><a href=\"https://plus.google.com/+RemeIo\">Google+</a></li>\n" +
    "                    </ul>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("app/common/partials/header-home.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/common/partials/header-home.html",
    "<nav class=\"navbar navbar-default navbar--white navbar--home navbar-fixed-top\">\n" +
    "\n" +
    "    <div class=\"navbar__wrapper navbar__wrapper--home\">\n" +
    "\n" +
    "        <!-- Brand and toggle get grouped for better mobile display -->\n" +
    "        <div class=\"navbar-header\">\n" +
    "            <button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#navbar-collapse-target\">\n" +
    "                <span class=\"sr-only\">Toggle navigation</span>\n" +
    "                <span class=\"icon-bar\"></span>\n" +
    "                <span class=\"icon-bar\"></span>\n" +
    "                <span class=\"icon-bar\"></span>\n" +
    "            </button>\n" +
    "            <a class=\"navbar-brand navbar__wrapper__brand\" ui-sref=\"home\">\n" +
    "                <span class=\"navbar__wrapper__brand__logo\"></span>\n" +
    "                <span class=\"navbar__wrapper__brand__text\">Reme</span>\n" +
    "            </a>\n" +
    "        </div>\n" +
    "\n" +
    "        <!-- Collect the nav links, forms, and other content for toggling -->\n" +
    "        <div class=\"collapse navbar-collapse\" id=\"navbar-collapse-target\">\n" +
    "            <ul class=\"nav navbar-nav navbar-right\">\n" +
    "                <li>\n" +
    "                    <a href=\"javascript:void(0)\" ui-sref=\"about\">About</a>\n" +
    "                </li>\n" +
    "                <li ng-if=\"! currentUser.isAuthenticated()\" class=\"btn__wrapper\">\n" +
    "                    <a class=\"btn btn--login\" href=\"javascript:void(0)\" ui-sref=\"account\">Login</a></li>\n" +
    "                <li class=\"narrow btn__wrapper\" ng-if=\"currentUser.isAuthenticated()\">\n" +
    "                    <a class=\"btn btn--to-reminders\" href=\"javascript:void(0)\" ui-sref=\"reminders.regular\">Go to my reminders</a>\n" +
    "                </li>\n" +
    "                <li class=\"btn__wrapper\" ng-if=\"currentUser.isAuthenticated()\">\n" +
    "                    <a class=\"btn btn--logout\" href=\"javascript:void(0)\" ui-sref=\"account:logout\">Logout</a>\n" +
    "                </li>\n" +
    "            </ul>\n" +
    "        </div>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "</nav>");
}]);

angular.module("app/common/partials/header.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/common/partials/header.html",
    "<nav class=\"navbar navbar-default navbar--white\">\n" +
    "\n" +
    "    <div class=\"navbar__wrapper\">\n" +
    "\n" +
    "        <!-- Brand and toggle get grouped for better mobile display -->\n" +
    "        <div class=\"navbar-header\">\n" +
    "            <button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#navbar-collapse-target\">\n" +
    "                <span class=\"sr-only\">Toggle navigation</span>\n" +
    "                <span class=\"icon-bar\"></span>\n" +
    "                <span class=\"icon-bar\"></span>\n" +
    "                <span class=\"icon-bar\"></span>\n" +
    "            </button>\n" +
    "            <a class=\"navbar-brand navbar__wrapper__brand\" href=\"javascript:void(0)\" ui-sref=\"reminders.regular\">\n" +
    "                <span class=\"navbar__wrapper__brand__logo\"></span>\n" +
    "                <span class=\"navbar__wrapper__brand__text\"></span>\n" +
    "            </a>\n" +
    "        </div>\n" +
    "\n" +
    "        <!-- Collect the nav links, forms, and other content for toggling -->\n" +
    "        <div class=\"collapse navbar-collapse\" id=\"navbar-collapse-target\">\n" +
    "            <ul class=\"nav navbar-nav navbar-right\">\n" +
    "                <li>\n" +
    "                    <a id=\"feedback-trigger\" class=\"navbar__wrapper__feedback navbar__link\" href=\"javascript:void(0)\">\n" +
    "                        <span class=\"icon-comment-2\"></span> Send feedback\n" +
    "                    </a>\n" +
    "                </li>\n" +
    "                <li class=\"dropdown\">\n" +
    "                    <a ng-show=\"currentUser.model.email\" href=\"javascript:void(0)\" class=\"dropdown-toggle navbar__link\" data-toggle=\"dropdown\" role=\"button\" aria-expanded=\"false\">{{currentUser.model.email}}\n" +
    "                        <span class=\"caret\"></span>\n" +
    "                    </a>\n" +
    "                    <ul class=\"dropdown-menu\" role=\"menu\">\n" +
    "                        <li><a class=\"nav-link\" href=\"javascript:void(0)\" ui-sref=\"settings\">Settings</a></li>\n" +
    "                        <li><a class=\"nav-link\" href=\"javascript:void(0)\" ui-sref=\"account:logout\">Logout</a></li>\n" +
    "                    </ul>\n" +
    "                </li>\n" +
    "            </ul>\n" +
    "        </div>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "</nav>");
}]);

angular.module("app/common/partials/timepickerPopup/timepickerPopup.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/common/partials/timepickerPopup/timepickerPopup.html",
    "<button type=\"button\" class=\"btn btn--reminder-popup bg-sprite dropdown-toggle\" animate animate-on=\"nlpDate:timeChange\" animate-class=\"highlight-button\" dropdown-toggle> {{date | friendlyHourTimePicker}}</button>\n" +
    "\n" +
    "<ul class=\"dropdown-menu dropdown-menu-time-picker\" perfect-scrollbar suppress-scroll-x=\"true\" wheel-speed=\"52\" update-on=\"perfectScrollbar:update\">\n" +
    "    <li ng-repeat=\"time in times\" ng-class=\"{selected: highlightSelected && time.index == selectedIndex}\">\n" +
    "        <a href ng-click=\"setTime(time)\">{{time.timestamp | friendlyHourTimePicker}}</a>\n" +
    "    </li>\n" +
    "</ul>\n" +
    "");
}]);

angular.module("template/datepicker/datepicker.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/datepicker/datepicker.html",
    "<table class=\"datepicker\">\n" +
    "  <thead>\n" +
    "    <tr class=\"datepicker-jump-controls\">\n" +
    "      <th><button type=\"button\" class=\"btn btn-default pull-left\" ng-click=\"move(-1)\">‹</button></th>\n" +
    "      <th colspan=\"{{rows[0].length - 2 + showWeekNumbers}}\"><button type=\"button\" class=\"btn btn-default btn-block\" ng-click=\"toggleMode()\"><strong>{{title}}</strong></button></th>\n" +
    "      <th><button type=\"button\" class=\"btn btn-default btn-block pull-right\" ng-click=\"move(1)\">›</button></th>\n" +
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
    "        <button type=\"button\" class=\"btn\" ng-class=\"{'btn-primary': dt.selected, 'btn-default': !dt.selected}\" ng-click=\"select(dt.date)\" ng-disabled=\"dt.disabled\"><span ng-class=\"{'text-muted': dt.secondary}\">{{dt.label}}</span></button>\n" +
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
    "		<button type=\"button\" class=\"btn btn-default btn-block\" ng-click=\"today(dt)\">Today</button>\n" +
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
    "<div tabindex=\"-1\" class=\"modal reminder-modal--animate {{ windowClass }}\" ng-class=\"{in: animate}\" ng-style=\"{'z-index': 1050 + index*10, display: 'block'}\" ng-click=\"close($event)\">\n" +
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
    "    <ul class=\"nav nav-{{type || 'tabs'}} nav-tabs--horizontal nav-tabs--underlined\"\n" +
    "        ng-class=\"{'nav-stacked nav-tabs--vertical': vertical, 'nav-justified': justified}\"\n" +
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
