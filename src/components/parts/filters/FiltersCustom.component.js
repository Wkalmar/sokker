import React from 'react';
// MobX
import { observer } from "mobx-react";
import { observable, values } from "mobx";
// SVG
import DeleteSVG from 'svg/delete.svg';
// Store
import store from "store";
// Components
import T from "components/parts/T.component";
import PreLoader from "components/parts/PreLoader.component";


class FiltersCustom extends React.Component {

	newFilterName = observable.box('');

	isLoading = observable.box(false);

	get filters() { return values(store.users.authorizedUser.filters); };


	createCustomFilter = async ()=> {
		this.isLoading.set(true);
		await store.users.authorizedUser.createFilterMutation({
			name: this.newFilterName.get(),
			filter: JSON.stringify(store.filters.snapshot)
		});
		this.isLoading.set(false);
		this.newFilterName.set('');
	};


	async deleteCustomFilter(filterId) {
		this.isLoading.set(true);
		await store.users.authorizedUser.deleteFilterMutation({ filterId });
		this.isLoading.set(false);
	};


	applyCustomFilter({ filter }) {
		console.log(JSON.parse(filter), "applyCustomFilter!");
		store.filters.resetFilters(JSON.parse(filter));
	}


	render() {
		return (
			<div className="filter">
				<div className="filter_title"><T>Save you custom filter</T></div>
				<div style={{ display: 'flex' }}>
					<input type="text"
						   placeholder={ store.t('new filter name') }
						   value={ this.newFilterName.get() }
						   onChange={ (e)=> this.newFilterName.set(e.currentTarget.value.substring(0, 10)) } />
					<button disabled={ !this.newFilterName.get() || this.isLoading.get() }
							onClick={ this.createCustomFilter }>
						{ this.isLoading.get() ?
							<PreLoader />
							:
							<T>Save</T>
						}
					</button>
				</div>
				<div style={{ display: 'flex' }}>
					{ this.filters.map((filter)=> {
						return (
							<div style={{ display: 'flex' }} key={ filter.id }>
								<button style={{ margin: '0 0 5px 0', padding: '10px', color: 'black' }}
										onClick={ ()=> this.applyCustomFilter(filter) }>{ filter.name }</button>
								<button style={{ padding: '10px' }}
										disabled={ this.isLoading.get() }
										onClick={ ()=> this.deleteCustomFilter(filter.id) }>
									{ this.isLoading.get() ?
										<PreLoader />
										:
										<DeleteSVG />
									}
								</button>
							</div>
						)
					}) }
				</div>
			</div>
		);
	}
}

export default observer(FiltersCustom)