import React from 'react';
// MobX
import { observer } from "mobx-react";
// Store
import store from "store";
// GraphQL
import USER_PLAYERS_QUERY from "graphql/queries/players/userPlayers.query";
// Components
import Link from "components/Link.component";
import QueryLoader from "components/QueryLoader.component";
import Interface from "components/parts/interface/Interface.component";
import PreLoader from "components/parts/PreLoader.component";


class HomePage extends React.Component {

	render() {
		return (
			<div style={{
				opacity: store.currentPath === "/" ? "1" : "0",
				height: store.currentPath === "/" ? "auto" : "0",
				overflow: store.currentPath === "/" ? "auto" : "hidden"
			}}>
				{ !store.authorizedUserId &&
					<div style={{ padding: '20px' }}>
						<div className="info">
							<h1>🧠 Brainsokker</h1>
							<p>На этом сайте можно мониторить текущие трансферы игроков с сайта sokker.org.</p>
							<p>Для начала работы нужно залогиниться или зарегистрироваться.</p>
							<p>Ваш логин и пароль от сайта sokker.org не требуется.</p>
							<p>После создания аккаунта вы увидите список трансферов и стандартные графики.</p>
							<p>Чтобы расширить функционал пользования сайтом нужно на странице <a target="blank" href="https://brainsokker42.firebaseapp.com/neuralnetwork">neuralnetwork</a> включив нейросеть.</p>
							<br/>
							<p>Эта нейросеть нужна в том случае, если вы хотите настроить свой собственный поиск игроков по установленным вами критериям.</p>
							<p>Нейросеть можно научить оценивать игроков по четырем характеристиками ATT MID DEF GK.</p>
							<p>Оценивать можно от 0 до 100 единиц. При этом вы сами решаете игроков с какими параметрами помечать высокими баллами, а каких низкими.</p>
							<br/>
							<p>После каждого сохранения игрока для обучения нейросети она будет переобучаться и делать новые предположения относительно игроков на трансфере.</p>
							<p>Таким образом можно скоррестировать проесс обучения и его результат.</p>
							<p>Если по какой-то причине обучение пошло не так как вым бы хотелось, вы можете на странице <a target="blank" href="https://brainsokker42.firebaseapp.com/neuralnetwork">neuralnetwork</a> удалить одного или всех игроков по которым обучается нейросеть.</p>
							<br/>
							<p>Проект находится в активной стадии разработки поэтому возможны некоторые неточности в работе или баги.</p>
							<p>По всем вопросам пишите на <a target="blank" href="http://sokker.org/team/teamID/75331">мой аккаунт</a>  в sokker.org или в телеграм @andiwillfly.</p>
						</div>

						<button><Link to="/login">Login</Link></button>
						<br/>
						<button><Link to="/login">Registration</Link></button>
					</div>
				}

				{ store.authorizedUserId &&
					<QueryLoader query={ USER_PLAYERS_QUERY }
								 preLoader={ <div className="cssload-loader-big"><PreLoader/></div>}
								 variables={{ userId: store.authorizedUserId }}>
						<Interface />
					</QueryLoader>
				}
			</div>
		)
	}
}


export default observer(HomePage);