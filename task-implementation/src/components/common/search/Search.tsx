import React, { Component, ChangeEvent, createRef } from 'react';
import { connect } from 'react-redux';

import { updatePhrase } from '../../../store/actions/searchActions';

import searchStyles from './search.module.css';
import iconSearch from '../../../assets/icon-search.svg';

interface SearchProps {
  phrase: string;
  updatePhrase: (phrase: string) => void;
};

interface SearchState { };

class Search extends Component<SearchProps, SearchState> {

  inputRef: React.RefObject<HTMLInputElement>;

  constructor(props: SearchProps) {
    super(props);

    this.inputRef = createRef<HTMLInputElement>();
  }

  handleInput = (event: ChangeEvent<HTMLInputElement>): void => {

    const phrase: string = event.target.value;

    this.props.updatePhrase(phrase);
  }

  setOnFocus = (): void => {

    if (this.inputRef.current) {
      this.inputRef.current.focus();
    }
  }

  render() {
    return (
      <div className={ searchStyles.inputWrapper }>
        <input ref={ this.inputRef } className={ searchStyles.searchInput } type="text" placeholder="Search" value={ this.props.phrase } onChange={ this.handleInput } />
        <div className={ searchStyles.searchIconWrapper } onClick={ this.setOnFocus }>
          <img
              src={ iconSearch }
              alt={ 'search' }
            />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    phrase: state.search
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    updatePhrase: (phrase: string) => dispatch(updatePhrase(phrase))
  };
};
  
export default connect(mapStateToProps, mapDispatchToProps)(Search);