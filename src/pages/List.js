import { Link, useNavigate, useParams } from "react-router-dom";
import {useState, useEffect} from "react";
import Header from '../components/Header.js';
import styles from '../styles.js';
import UserData from './UserData.js';
import ProblemData from './ProblemData.js';
import ReactDOM from "react-dom";
import ProblemEditor from "./ProblemEditor.js";
import "../modalStyle.css";

const url = 'http://34.124.232.186:5000/';

function List( { user, type } ) {
    const navigate = useNavigate();

    const [displayEdit, setDisplayEdit] = useState(false);
    const [items, setItems] = useState(null);
    const [filteredItems, setFilteredItems] = useState(null);
    const [currentItem, setCurrentItem] = useState(null);
    const [token, setToken] = useState('');
    const [hidden, setHidden] = useState(false);
    const id = useParams().id;

    const modalRoot = document.getElementById("modal-root");

    const Modal = ({child}) => {
        if(modalRoot) {
            return ReactDOM.createPortal(
                <div className="modal"><div className="modal-content">{child}</div></div>,
                modalRoot
              );
        } else {
            return null;
        }
        
      };

    useEffect(() => {

        let storedToken = window.localStorage.getItem('token');
        if ( storedToken !== "" ) setToken(storedToken);
        else navigate('/judge-manager/auth');
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
                if ((data.detail == "Invalid token") || (data.detail == "Token has expired")) navigate('/judge-manager/auth');
                console.log(data);
                console.log(data.data);
                setItems(data.data);
                if (id != 'all' && id != 'new') {
                    data.data.forEach(item => {
                        if (item.id == parseInt(id)) setCurrentItem(item);
                    });
                }
                console.log("current: " + currentItem);
            } catch (error) {
                console.log(error);
            } finally {
                
            }
        };

        setCurrentItem(null);
        setFilteredItems(null);

        if (storedToken != '') {
            fetchData();
        }

        }, [type, token]);

    return (
        <div id="modal-root">
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
                        {filteredItems != null ? (filteredItems.map(item => {
                            return <div onClick={() => setCurrentItem(item)} style={currentItem != null && currentItem.id == item.id ? {borderStyle: 'solid', borderColor: "#2424c7", borderRadius: 10, margin: 15} : {borderStyle: 'solid', borderRadius: 10, margin: 15}}>
                                <p style={{fontSize: '22px', userSelect: 'none'}}>{type == 'user' ? item.username : item.title}</p>
                            </div>
                        })) : <div>{items != null ? 
                        (items.map(item => {
                            return <div onClick={() => setCurrentItem(item)} style={currentItem != null && currentItem.id == item.id ? {borderStyle: 'solid', borderColor: "#2424c7", borderRadius: 10, margin: 15} : {borderStyle: 'solid', borderRadius: 10, margin: 15}}>
                                <p style={{fontSize: '22px', userSelect: 'none'}}>{type == 'user' ? item.username : item.title}</p>
                            </div>
                        })) : null}</div>}
                    </div>

                    <div style={{
                                flex: 3,
                                textAlign: 'center',
                                fontSize: '32px',
                                borderStyle: 'solid',
                                borderRadius: 10,
                                borderColor: 'grey',
                                margin: 15}}>
                        {currentItem == null || (type == 'user' && currentItem.is_superuser == null) ? (<h1>No item selected</h1>) : (<div>{type == 'user' ? <UserData currentUser={currentItem} hidden={hidden} setHidden={setHidden} items={items} setFilteredItems={setFilteredItems} /> : <ProblemData user={user} problem={currentItem} hidden={hidden} setHidden={setHidden} displayEdit={displayEdit} />}</div>)}
                        
                    </div>
                </div>
            </div>}
            {id !=  null && id != 'all' ? <Modal child={<ProblemEditor toEdit={id == "new" ? null : currentItem} id={id} user={user}/>}/> : null}
        </div>
    );
}

export default List;