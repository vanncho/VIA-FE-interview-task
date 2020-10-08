import React from 'react';

import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure, ShallowWrapper } from 'enzyme';

import Frame from './Frame';

import SupportMember from '../../../models/SupportMember';

configure({ adapter: new Adapter() });

describe('<Frame /> Component Tests', () => {

  let frameShallow: ShallowWrapper<Frame>;
  const member: SupportMember = {
    firstName: "Roderick",
    lastName: "Schumm",
    available: false,
    phone: "018 782       1495",
    email: "Roderick.Wuckert@viasupport.com",
    image: "https://images.unsplash.com/photo-1528660493888-ab6f4761e036?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1800&q=80",
    location: "New York, USA"
  };

  beforeAll(() => {

    frameShallow = shallow(<Frame key={ 0 } member={ member } />);
  });

  it('should state prop "member" to be equal to member object', () => {

    expect(frameShallow.state('member')).toEqual(member);
  });

  it('should contains two <img> tags', () => {

    expect(frameShallow.find('img').length).toEqual(2);
  });

  it('should contains <div> tags with className "frameWrapper"', () => {

    expect(frameShallow.hasClass('frameWrapper')).toBeTruthy();
  });

  it('should set state prop "hovered" to be true', () => {

    frameShallow.setState({ hovered: true });

    expect(frameShallow.state('hovered')).toEqual(true);
  });

  it('should hover on status icon and state prop "hovered" to be true', () => {

    frameShallow.find('img.status').simulate('hover');

    expect(frameShallow.state('hovered')).toEqual(true);
  });

});
