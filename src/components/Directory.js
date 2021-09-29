import React from 'react';
import { connect } from 'react-redux';
import  { createStructuredSelector } from 'reselect';

import { selectDirectorySections } from '../redux/directory/directory.selectors';

import MenuItems from './MenuItems';
import '../styles/directory.scss';

const Directory = ({ sections }) => (
            <div className='directory-menu'>
                {sections.map(({id, ...otherSectionProps}) => <MenuItems key={id} {...otherSectionProps}/>)}
            </div>
        );

const mapStateToProps = state => createStructuredSelector({
  sections: selectDirectorySections
});

export default connect(mapStateToProps)(Directory);