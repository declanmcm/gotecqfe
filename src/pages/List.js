import { Link, useNavigate } from "react-router-dom";
import {useState, useEffect} from "react";
import Header from '../components/Header.js';
import styles from '../styles.js';
import UserData from './UserData.js';
import ProblemData from './ProblemData.js';

const url = 'http://34.124.232.186:5000/';

function List( { user, type } ) {
    const navigate = useNavigate();

    const [items, setItems] = useState(null);
    const [currentItem, setCurrentItem] = useState(null);
    const [token, setToken] = useState('');

    useEffect(() => {

        const storedToken = window.localStorage.getItem('token');
        if ( storedToken !== null ) setToken(storedToken);
        console.log("Token: " + storedToken);

        const fetchData = async () => {
            let data = null;
            try {
                let toAppend = '';
                if (type == 'user') toAppend = 'admin/users';
                else toAppend = 'problem';
                const response = await fetch(url + toAppend, {
                    method: "GET",
                    headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': "Token " + storedToken }});
                data = await response.json();
                console.log(data.data);
                setItems(data.data);
            } catch (error) {
                console.error("Error fetching sample", error);
            } finally {
                
            }
        };

        setCurrentItem(null);

        if (storedToken != '') {
            fetchData();
        }

        }, [type, token]);

    return (
        <div>
            {token == '' ? 
            <div>
                <p style={{fontSize: '26px', color: 'white'}}>Loading</p>
            </div> :
            <div>
                <Header text={type == 'user' ? 'Problem' : 'User'}/>
                <div style={styles.containerStyle}>
                    <div style={{
                                flex: 1,
                                textAlign: 'center',
                                fontSize: '32px',
                                borderStyle: 'solid',
                                borderRadius: 10,
                                borderColor: 'grey',
                                margin: 15}}>
                        <h1>{type == 'user' ? 'Users' : 'Problems'}</h1>
                        {type == 'problem' ? <button style={styles.buttonStyleApp} onClick={() => navigate('/judge-manager/app/problem/new') }> Create problem</button> : null}
                        {items != null ? 
                        (items.map(item => {
                            return <div onClick={() => setCurrentItem(item)} style={currentItem != null && currentItem.id == item.id ? {borderStyle: 'solid', borderColor: "#2424c7", borderRadius: 10, margin: 15} : {borderStyle: 'solid', borderRadius: 10, margin: 15}}>
                                <p style={{fontSize: '22px', userSelect: 'none'}}>{type == 'user' ? item.username : item.title}</p>
                            </div>
                        })) : null}
                    </div>

                    <div style={{
                                flex: 3,
                                textAlign: 'center',
                                fontSize: '32px',
                                borderStyle: 'solid',
                                borderRadius: 10,
                                borderColor: 'grey',
                                margin: 15}}>
                        {currentItem == null || (type == 'user' && currentItem.is_superuser == null) ? (<h1>No item selected</h1>) : (<div>{type == 'user' ? <UserData currentUser={currentItem} /> : <ProblemData problem={currentItem} />}</div>)}
                        
                        
                    </div>
                </div>
            </div>}
        </div>
    );
}

export default List;