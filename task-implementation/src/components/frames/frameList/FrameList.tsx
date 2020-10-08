import React, { Component } from 'react';
import { connect } from 'react-redux';

import supportTeamRemote from '../../../api/supportTeamRemote';

import Frame from '../frame/Frame';

import SupportMember from '../../../models/SupportMember';

import frameListStyles from './frameList.module.css';

interface FrameListProps {
  phrase: string;
};

interface FrameListState {
  members: Array<SupportMember>;
  debounceTimeMs: number;
};

class FrameList extends Component<FrameListProps, FrameListState> {

  state = {
    members: [],
    debounceTimeMs: 500
  };

  debounce: ReturnType<typeof setTimeout> = setTimeout(() => {}, 0);
  
  componentDidMount(): void {

    this.fetchSupportTeam();
  }

  componentDidUpdate(prevProps: FrameListProps): void {

    if (this.props.phrase !== prevProps.phrase) {

      // simulate debounce to prevent on every key up send api call
      this.debounce = setTimeout(() => this.fetchSupportTeam(this.props.phrase), this.state.debounceTimeMs);
    }
  }

  componentWillUnmount(): void {
    
    clearInterval(this.debounce);
  }

  fetchSupportTeam = (firstName?: string): void => {

    supportTeamRemote.getAvailableSupportTeam(firstName).then((resp: Array<SupportMember>) => {

      if (resp) {

        this.setState({ members: resp });
      }
    })
    .catch((error: any) => {

      // not implemented due the fake API
    });
  }

  render() {
    return (
      <section className={ frameListStyles.frameListWrapper }>
        { this.state.members.length > 0 &&
          this.state.members.map((member: SupportMember, index: number) => {
            return <Frame key={ index } member={ member }></Frame>;
          })
        }
      </section>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    phrase: state.search
  };
};
  
export default connect(mapStateToProps, {})(FrameList);