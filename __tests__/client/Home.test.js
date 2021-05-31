import React from 'react';
import Home from '../../client/Components/Dashboard/Home.jsx';
import { mount, shallow } from 'enzyme';
// configure and adapter is necessary for Enzyme.
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';


configure({ adapter: new Adapter() });

// test cases starts here

describe('Home Component Tests', () => {
    it('should contain/render Navbar component', () => {
        const wrapper = shallow(<Home />);
        expect(wrapper.text()).toContain('<Navbar />');
    })

    it('should have div element with className of homeContainer', () => {
        const wrapper = shallow(<Home />);
        expect(wrapper.find('div').hasClass('homeContainer')).toEqual(true);
    })

    it('should have contain dashboardHeader', () => {
        const wrapper = shallow(<Home />);
        expect(wrapper.text()).toContain('<DashboardHeader />');
    })
})