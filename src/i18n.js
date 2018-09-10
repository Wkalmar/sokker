import i18n from 'i18next';
import Backend from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { reactI18nextModule } from 'react-i18next';


const detectorOptions = {
	// order and from where user language should be detected
	order: ['localStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],

	// keys or params to lookup language from
	lookupLocalStorage: 'i18nextLng',

	// cache user language on
	caches: ['localStorage'],
	excludeCacheFor: ['cimode'], // languages to not persist (cookie, localStorage)
};


i18n.lang = window.localStorage.getItem('i18nextLng');
i18n
	.use(Backend)
	.use(LanguageDetector)
	.use(reactI18nextModule)
	.init({
		detection: detectorOptions,

		// lng: i18n.lang,
		languages: ["en", "ru", "pl", "ua"],

		preload: ["en", "ru", "pl", "ua"],

		// have a common namespace used around the full app
		ns: ['translations'],
		defaultNS: 'translations',
		backend: {
			loadPath: '/locales/{{lng}}/{{ns}}.json',
		},

		debug: false,

		interpolation: {
			escapeValue: false, // not needed for react!!
		},

		react: {
			wait: true
		}
	});

export default i18n;