import React from 'react';
// MobX
import { observer } from "mobx-react";
// Store
import store from "store";


class InfoPage extends React.Component {

	render() {
		return (
			<div>
				<h1>Руководство пользователя</h1>
				<p>На этом сайте можно мониторить текущие трансферы игроков с сайта sokekr.org</p>
				<p>Для начала работы нужно залогиниться или зарегистрироваться</p>
				<p>Ваш логин и пароль от сайта sokker.org не требуется</p>
				<p>После создания аккаунта вы увидите список трансферов и стандартные графики</p>
				<p>Чтобы расширить функционал пользования сайтом нужно на странице включить нейросеть</p>
				<p>С помощью нее </p>
			</div>
		)
	}
}


export default observer(InfoPage);