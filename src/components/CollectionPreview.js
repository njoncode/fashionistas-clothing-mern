import React from 'react';
import CollectionItem from './CollectionItem';
import '../styles/collectionPreview.scss'


const CollectionPreview = ({ title, items }) => (
    <div className='collection-preview'>
        <h1 className='title'>{title.toUpperCase()}</h1>
        <div className='preview'>
            {items
                .filter((item, index) => index < 4)
                // We can also use items.slice(0, 4)
                .map((item) => 
                    <CollectionItem key={item.id} item={item} />
                )
            }
        </div>
    </div>
)

export default CollectionPreview;



