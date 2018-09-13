import i18n from 'i18next';
import Backend from 'i18next-xhr-backend';
import { reactI18nextModule } from 'react-i18next';


i18n
	.use(Backend)
	.use(reactI18nextModule)
	.init({

		lng: window.localStorage.lang || 'en',
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