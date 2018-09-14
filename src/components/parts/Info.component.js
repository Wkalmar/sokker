// PNG
import screen1 from "png/screen1.png";
import screen2 from "png/screen2.png";
import screen3 from "png/screen3.png";
import screen4 from "png/screen4.png";
import screen5 from "png/screen5.jpeg";
import screen6 from "png/screen6.png";
import screen7 from "png/screen7.png";
import screen8 from "png/screen8.png";
import brain1 from "png/brain1.gif";
import React from 'react';
// MobX
import { observer } from "mobx-react";
// Store
import store from "store";
// Components
import Link from "components/Link.component";


class Info extends React.Component {

	render() {
		return (
			<div style={{ padding: '20px', background: 'black', color: '#e0dddd' }}>
				<div className="info" style={{ maxWidth: '800px', margin: '0 auto' }}>
					<img src={ brain1 } style={{ maxWidth: '100%' }} alt="brain"/>
					<h1>Brainsokker</h1>
					<p>На этом сайте можно мониторить текущие трансферы игроков с сайта <b>sokker.org</b>.</p>
					<p>Для начала работы нужно залогиниться или зарегистрироваться.</p>
					<p>Ваш логин и пароль от сайта <b>sokker.org</b> не требуется.</p>
					<p>После создания аккаунта вы увидите список трансферов и стандартные графики:</p>
					<img style={{ margin: '10px 0', maxWidth: '100%' }} src={ screen6 } alt="screen6"/>
					<p>В боковом меню расположены фильтры для игроков.</p>
					<img style={{ margin: '10px 0', maxWidth: '100%' }} src={ screen7 } alt="screen7"/>
					<p>Вы можете сохранять нужные вам фильтры:</p>
					<img style={{ margin: '10px 0', maxWidth: '100%' }} src={ screen8 } alt="screen8"/>
					<br/>
					<br/>
					<p>Расширить функционал сайта можно на
						странице <a target="blank" href="https://brainsokker42.firebaseapp.com/neuralnetwork">neuralnetwork</a> включив нейросеть:</p>
					<img style={{ margin: '10px 0', maxWidth: '100%' }} src={ screen1 } alt="screen1"/>
					<br/>
					<p>Нейросеть понадобится в том случае, если вы хотите настроить свой собственный поиск игроков по установленным вами индивидуальным критериям.</p>
					<p>Нейросеть можно научить оценивать игроков по четырем характеристиками <b>ATT MID DEF GK</b>.</p>
					<p>Оценивать можно от <b>0</b> до <b>100</b> единиц. При этом вы сами решаете игроков с какими параметрами помечать высокими баллами, а каких низкими:</p>
					<img style={{ margin: '10px 0', maxWidth: '100%' }} src={ screen2 } alt="screen2"/>
					<br/>
					<p>После каждого сохранения игрока для обучения нейросеть будет переобучаться и делать новые предположения относительно игроков на трансфере:</p>
					<img style={{ margin: '10px 0', maxWidth: '100%' }} src={ screen3 } alt="screen3"/>
					<br/>
					<p>Таким образом можно скорректировать проесс обучения и его результат.</p>
					<p>Если по какой-то причине обучение пошло не так как вам бы хотелось, вы можете на
						странице <a target="blank" href="https://brainsokker42.firebaseapp.com/neuralnetwork">neuralnetwork</a> удалить одного или всех игроков по которым обучается нейросеть:</p>
					<img style={{ margin: '10px 0', maxWidth: '100%' }} src={ screen4 } alt="screen4"/>
					<br/>
					<br/>
					<p>Проект находится в активной стадии разработки поэтому возможны некоторые неточности в работе
						и <a target="blank" href="https://www.google.com/search?q=%D0%B1%D0%B0%D0%B3%D0%B3%D0%B8&source=lnms&tbm=isch&sa=X&ved=0ahUKEwjpooLLt7rdAhVSY1AKHRH9D8wQ_AUICigB&biw=1899&bih=960">багги</a>.
						Постараюсь оперативно их исправлять по мере возможности.</p>
					<img style={{ margin: '10px 0', maxWidth: '100%' }} src={ screen5 } alt="screen5"/>
					<p>Если возникнут идеи как улучшить функционал или появятся вопросы, пишите на <b><a target="blank" href="http://sokker.org/team/teamID/75331">мой аккаунт</a></b> в sokker.org
						или в телеграм <b><a target="blank" href="http://vvesti.net/uploads/posts/2011-09/1315934884_300h-programmist.jpg">@andiwillfly</a></b>.</p>
					<br/>
					<br/>
					<br/>
					<b>P.S. Большое спасибо за помощь в разработке сайта <a target="blank" href="http://sokker.org/team/teamID/111293">WKalmar!</a></b>
				</div>

				{ !store.authorizedUserId ?
					<div>
						<Link to="/login" className="pseudo-button">Login</Link>
						<br/>
						<Link to="/registration" className="pseudo-button">Registration</Link>
					</div>
					: null }
			</div>
		)
	}
}

export default observer(Info);
