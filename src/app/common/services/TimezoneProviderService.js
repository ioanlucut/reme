angular
  .module('remeCommon')
  .service('TimezoneProvider', function () {

    /**
     * All timezones
     * @type {{key: string, value: string}[]}
     */
    this.timezones = [
      { key: 'Pacific/Midway', value: '(UTC-11:00) Midway Island' },
      { key: 'Pacific/Samoa', value: '(UTC-11:00) Samoa' },
      { key: 'Pacific/Honolulu', value: '(UTC-10:00) Hawaii' },
      { key: 'US/Alaska', value: '(UTC-09:00) Alaska' },
      { key: 'America/Los_Angeles', value: '(UTC-08:00) Pacific Time (US &amp; Canada)' },
      { key: 'America/Tijuana', value: '(UTC-08:00) Tijuana' },
      { key: 'US/Arizona', value: '(UTC-07:00) Arizona' },
      { key: 'America/Chihuahua', value: '(UTC-07:00) Chihuahua' },
      { key: 'America/Chihuahua', value: '(UTC-07:00) La Paz' },
      { key: 'America/Mazatlan', value: '(UTC-07:00) Mazatlan' },
      { key: 'US/Mountain', value: '(UTC-07:00) Mountain Time (US &amp; Canada)' },
      { key: 'America/Managua', value: '(UTC-06:00) Central America' },
      { key: 'US/Central', value: '(UTC-06:00) Central Time (US &amp; Canada)' },
      { key: 'America/Mexico_City', value: '(UTC-06:00) Guadalajara' },
      { key: 'America/Mexico_City', value: '(UTC-06:00) Mexico City' },
      { key: 'America/Monterrey', value: '(UTC-06:00) Monterrey' },
      { key: 'Canada/Saskatchewan', value: '(UTC-06:00) Saskatchewan' },
      { key: 'America/Bogota', value: '(UTC-05:00) Bogota' },
      { key: 'US/Eastern', value: '(UTC-05:00) Eastern Time (US &amp; Canada)' },
      { key: 'US/East-Indiana', value: '(UTC-05:00) Indiana (East)' },
      { key: 'America/Lima', value: '(UTC-05:00) Lima' },
      { key: 'America/Bogota', value: '(UTC-05:00) Quito' },
      { key: 'Canada/Atlantic', value: '(UTC-04:00) Atlantic Time (Canada)' },
      { key: 'America/Caracas', value: '(UTC-04:30) Caracas' },
      { key: 'America/La_Paz', value: '(UTC-04:00) La Paz' },
      { key: 'America/Santiago', value: '(UTC-04:00) Santiago' },
      { key: 'Canada/Newfoundland', value: '(UTC-03:30) Newfoundland' },
      { key: 'America/Sao_Paulo', value: '(UTC-03:00) Brasilia' },
      { key: 'America/Argentina/Buenos_Aires', value: '(UTC-03:00) Buenos Aires' },
      { key: 'America/Argentina/Buenos_Aires', value: '(UTC-03:00) Georgetown' },
      { key: 'America/Godthab', value: '(UTC-03:00) Greenland' },
      { key: 'America/Noronha', value: '(UTC-02:00) Mid-Atlantic' },
      { key: 'Atlantic/Azores', value: '(UTC-01:00) Azores' },
      { key: 'Atlantic/Cape_Verde', value: '(UTC-01:00) Cape Verde Is.' },
      { key: 'Africa/Casablanca', value: '(UTC+00:00) Casablanca' },
      { key: 'Europe/London', value: '(UTC+00:00) Edinburgh' },
      { key: 'Etc/Greenwich', value: '(UTC+00:00) Greenwich Mean Time : Dublin' },
      { key: 'Europe/Lisbon', value: '(UTC+00:00) Lisbon' },
      { key: 'Europe/London', value: '(UTC+00:00) London' },
      { key: 'Africa/Monrovia', value: '(UTC+00:00) Monrovia' },
      { key: 'UTC', value: '(UTC+00:00) UTC' },
      { key: 'Europe/Amsterdam', value: '(UTC+01:00) Amsterdam' },
      { key: 'Europe/Belgrade', value: '(UTC+01:00) Belgrade' },
      { key: 'Europe/Berlin', value: '(UTC+01:00) Berlin' },
      { key: 'Europe/Berlin', value: '(UTC+01:00) Bern' },
      { key: 'Europe/Bratislava', value: '(UTC+01:00) Bratislava' },
      { key: 'Europe/Brussels', value: '(UTC+01:00) Brussels' },
      { key: 'Europe/Budapest', value: '(UTC+01:00) Budapest' },
      { key: 'Europe/Copenhagen', value: '(UTC+01:00) Copenhagen' },
      { key: 'Europe/Ljubljana', value: '(UTC+01:00) Ljubljana' },
      { key: 'Europe/Madrid', value: '(UTC+01:00) Madrid' },
      { key: 'Europe/Paris', value: '(UTC+01:00) Paris' },
      { key: 'Europe/Prague', value: '(UTC+01:00) Prague' },
      { key: 'Europe/Rome', value: '(UTC+01:00) Rome' },
      { key: 'Europe/Sarajevo', value: '(UTC+01:00) Sarajevo' },
      { key: 'Europe/Skopje', value: '(UTC+01:00) Skopje' },
      { key: 'Europe/Stockholm', value: '(UTC+01:00) Stockholm' },
      { key: 'Europe/Vienna', value: '(UTC+01:00) Vienna' },
      { key: 'Europe/Warsaw', value: '(UTC+01:00) Warsaw' },
      { key: 'Africa/Lagos', value: '(UTC+01:00) West Central Africa' },
      { key: 'Europe/Zagreb', value: '(UTC+01:00) Zagreb' },
      { key: 'Europe/Athens', value: '(UTC+02:00) Athens' },
      { key: 'Europe/Bucharest', value: '(UTC+02:00) Bucharest' },
      { key: 'Africa/Cairo', value: '(UTC+02:00) Cairo' },
      { key: 'Africa/Harare', value: '(UTC+02:00) Harare' },
      { key: 'Europe/Helsinki', value: '(UTC+02:00) Helsinki' },
      { key: 'Europe/Istanbul', value: '(UTC+02:00) Istanbul' },
      { key: 'Asia/Jerusalem', value: '(UTC+02:00) Jerusalem' },
      { key: 'Europe/Helsinki', value: '(UTC+02:00) Kyiv' },
      { key: 'Africa/Johannesburg', value: '(UTC+02:00) Pretoria' },
      { key: 'Europe/Riga', value: '(UTC+02:00) Riga' },
      { key: 'Europe/Sofia', value: '(UTC+02:00) Sofia' },
      { key: 'Europe/Tallinn', value: '(UTC+02:00) Tallinn' },
      { key: 'Europe/Vilnius', value: '(UTC+02:00) Vilnius' },
      { key: 'Asia/Baghdad', value: '(UTC+03:00) Baghdad' },
      { key: 'Asia/Kuwait', value: '(UTC+03:00) Kuwait' },
      { key: 'Europe/Minsk', value: '(UTC+03:00) Minsk' },
      { key: 'Africa/Nairobi', value: '(UTC+03:00) Nairobi' },
      { key: 'Asia/Riyadh', value: '(UTC+03:00) Riyadh' },
      { key: 'Europe/Volgograd', value: '(UTC+03:00) Volgograd' },
      { key: 'Asia/Tehran', value: '(UTC+03:30) Tehran' },
      { key: 'Asia/Muscat', value: '(UTC+04:00) Abu Dhabi' },
      { key: 'Asia/Baku', value: '(UTC+04:00) Baku' },
      { key: 'Europe/Moscow', value: '(UTC+04:00) Moscow' },
      { key: 'Asia/Muscat', value: '(UTC+04:00) Muscat' },
      { key: 'Europe/Moscow', value: '(UTC+04:00) St. Petersburg' },
      { key: 'Asia/Tbilisi', value: '(UTC+04:00) Tbilisi' },
      { key: 'Asia/Yerevan', value: '(UTC+04:00) Yerevan' },
      { key: 'Asia/Kabul', value: '(UTC+04:30) Kabul' },
      { key: 'Asia/Karachi', value: '(UTC+05:00) Islamabad' },
      { key: 'Asia/Karachi', value: '(UTC+05:00) Karachi' },
      { key: 'Asia/Tashkent', value: '(UTC+05:00) Tashkent' },
      { key: 'Asia/Calcutta', value: '(UTC+05:30) Chennai' },
      { key: 'Asia/Kolkata', value: '(UTC+05:30) Kolkata' },
      { key: 'Asia/Calcutta', value: '(UTC+05:30) Mumbai' },
      { key: 'Asia/Calcutta', value: '(UTC+05:30) New Delhi' },
      { key: 'Asia/Calcutta', value: '(UTC+05:30) Sri Jayawardenepura' },
      { key: 'Asia/Katmandu', value: '(UTC+05:45) Kathmandu' },
      { key: 'Asia/Almaty', value: '(UTC+06:00) Almaty' },
      { key: 'Asia/Dhaka', value: '(UTC+06:00) Astana' },
      { key: 'Asia/Dhaka', value: '(UTC+06:00) Dhaka' },
      { key: 'Asia/Yekaterinburg', value: '(UTC+06:00) Ekaterinburg' },
      { key: 'Asia/Rangoon', value: '(UTC+06:30) Rangoon' },
      { key: 'Asia/Bangkok', value: '(UTC+07:00) Bangkok' },
      { key: 'Asia/Bangkok', value: '(UTC+07:00) Hanoi' },
      { key: 'Asia/Jakarta', value: '(UTC+07:00) Jakarta' },
      { key: 'Asia/Novosibirsk', value: '(UTC+07:00) Novosibirsk' },
      { key: 'Asia/Hong_Kong', value: '(UTC+08:00) Beijing' },
      { key: 'Asia/Chongqing', value: '(UTC+08:00) Chongqing' },
      { key: 'Asia/Hong_Kong', value: '(UTC+08:00) Hong Kong' },
      { key: 'Asia/Krasnoyarsk', value: '(UTC+08:00) Krasnoyarsk' },
      { key: 'Asia/Kuala_Lumpur', value: '(UTC+08:00) Kuala Lumpur' },
      { key: 'Australia/Perth', value: '(UTC+08:00) Perth' },
      { key: 'Asia/Singapore', value: '(UTC+08:00) Singapore' },
      { key: 'Asia/Taipei', value: '(UTC+08:00) Taipei' },
      { key: 'Asia/Ulan_Bator', value: '(UTC+08:00) Ulaan Bataar' },
      { key: 'Asia/Urumqi', value: '(UTC+08:00) Urumqi' },
      { key: 'Asia/Irkutsk', value: '(UTC+09:00) Irkutsk' },
      { key: 'Asia/Tokyo', value: '(UTC+09:00) Osaka' },
      { key: 'Asia/Tokyo', value: '(UTC+09:00) Sapporo' },
      { key: 'Asia/Seoul', value: '(UTC+09:00) Seoul' },
      { key: 'Asia/Tokyo', value: '(UTC+09:00) Tokyo' },
      { key: 'Australia/Adelaide', value: '(UTC+09:30) Adelaide' },
      { key: 'Australia/Darwin', value: '(UTC+09:30) Darwin' },
      { key: 'Australia/Brisbane', value: '(UTC+10:00) Brisbane' },
      { key: 'Australia/Canberra', value: '(UTC+10:00) Canberra' },
      { key: 'Pacific/Guam', value: '(UTC+10:00) Guam' },
      { key: 'Australia/Hobart', value: '(UTC+10:00) Hobart' },
      { key: 'Australia/Melbourne', value: '(UTC+10:00) Melbourne' },
      { key: 'Pacific/Port_Moresby', value: '(UTC+10:00) Port Moresby' },
      { key: 'Australia/Sydney', value: '(UTC+10:00) Sydney' },
      { key: 'Asia/Yakutsk', value: '(UTC+10:00) Yakutsk' },
      { key: 'Asia/Vladivostok', value: '(UTC+11:00) Vladivostok' },
      { key: 'Pacific/Auckland', value: '(UTC+12:00) Auckland' },
      { key: 'Pacific/Fiji', value: '(UTC+12:00) Fiji' },
      { key: 'Pacific/Kwajalein', value: '(UTC+12:00) International Date Line West' },
      { key: 'Asia/Kamchatka', value: '(UTC+12:00) Kamchatka' },
      { key: 'Asia/Magadan', value: '(UTC+12:00) Magadan' },
      { key: 'Pacific/Fiji', value: '(UTC+12:00) Marshall Is.' },
      { key: 'Asia/Magadan', value: '(UTC+12:00) New Caledonia' },
      { key: 'Asia/Magadan', value: '(UTC+12:00) Solomon Is.' },
      { key: 'Pacific/Auckland', value: '(UTC+12:00) Wellington' },
      { key: 'Pacific/Tongatapu', value: "(UTC+13:00) Nuku'alofa" },
    ];

    /**
     * Returns timezones.
     */
    this.getTimezones = function () {
      return this.timezones;
    };

    /**
     * Returns timezone details.
     */
    this.getTimezoneDescription = function (timezone) {
      var that = this;
      var timezoneDetail = _.filter(that.timezones, { key: timezone });

      if (timezoneDetail) {
        return _.isArray(timezoneDetail) ? timezoneDetail[0] : timezoneDetail;
      }
    };

  });
