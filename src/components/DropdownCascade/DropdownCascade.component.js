import React, { useState } from 'react';
// import DropdownCascade from 'react-dropdown-cascade';

const items = [
    {
        value: '1',
        label: 'Menu 1',
        children: [
            {
                value: '11',
                label: 'Another Item'
            },
            {
                value: '12',
                label: 'More Items',
                children: [
                    {
                        value: '121',
                        label: 'Sub Item A'
                    },
                    {
                        value: '122',
                        label: 'Sub Item B',
                        disabled: true
                    },
                    {
                        value: '123',
                        label: 'Sub Item C'
                    }
                ]
            }
        ]
    },
    {
        value: '2',
        label: 'Menu 2'
    },
    {
        value: '3',
        label: 'Menu 3',
        children: [
            {
                value: '31',
                label: 'Hello'
            },
            {
                value: '21',
                label: 'World'
            }
        ]
    }
];

export default function App() {
    const [dropdownValue, setDropdownValue] = useState();

    return (
        <>
            <h1 style={{ margin: 15 }}>react-dropdown-cascade</h1>
            {/*<DropdownCascade*/}
            {/*    customStyles={{*/}
            {/*        dropdown: {*/}
            {/*            style: {*/}
            {/*                margin: '5px 20px 15px 20px'*/}
            {/*            }*/}
            {/*        }*/}
            {/*    }}*/}
            {/*    items={items}*/}
            {/*    onSelect={(value, selectedItems) => {*/}
            {/*        console.log(value, selectedItems);*/}
            {/*        setDropdownValue(value);*/}
            {/*    }}*/}
            {/*    value={dropdownValue}*/}
            {/*/>*/}
        </>
    );
}