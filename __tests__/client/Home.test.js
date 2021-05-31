import React from 'react';
import Home from '../../client/Components/Dashboard/Home.jsx';
import { shallow } from 'enzyme';
// configure and adapter is necessary for Enzyme.
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

// test cases starts here

describe('Dashboard Tests', () => {
    it('Home Component Should contain/render Navbar component', () => {
        const wrapper = shallow(<Home/>);
        expect(wrapper.text()).toContain('<Navbar />');
    })
})