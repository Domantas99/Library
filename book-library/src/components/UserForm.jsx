import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getOffices } from "../store/office/actions";
import { updateUser } from '../store/user/actions';

export default function UserForm({user}) {
    const dispatch = useDispatch();
    const [userInfo, setUserInfo] = useState(user)
    const offices = useSelector((state) => state.office.offices);
    
    const handleChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        if(name==="officeId") {
            setUserInfo({...userInfo, officeId: value, office: offices[value-1]})
        } else {
        setUserInfo({...userInfo, [name]: value});
        }
    };

    useEffect(() => {
      setUserInfo(user);
      dispatch(getOffices())
      /* eslint-disable react-hooks/exhaustive-deps */
    }, [user])

    function OnSaveClick() {
        dispatch(updateUser(userInfo));
    }

    return (
        <div>
            <div>
                <img src={userInfo?.profilePictureUrl} alt=""></img>
            </div>
            <div>
                <div>            
                    <div className="input-wrapper">
                        <label htmlFor="profilePictureUrl">PROFILE PICTURE URL</label>
                        <br/>
                        <input
                            type="text"
                            value={userInfo?.profilePictureUrl}
                            name="profilePictureUrl"
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div>            
                    <div className="input-wrapper">
                        <label htmlFor="fullName">FULL NAME</label>
                        <br/>
                        <input
                            type="text"
                            value={userInfo?.fullName}
                            name="fullName"
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div>
                    <div className="input-wrapper">
                        <label htmlFor="role">Role</label>
                        <br/>
                        <input
                            type="text"
                            value={userInfo?.role}
                            name="role"
                            onChange={handleChange}
                        />
                    </div>

                    <div className="input-wrapper">
                        <label htmlFor="officeId">DEFAULT OFFICE</label>
                        <br/>
                        <select
                            value={userInfo?.officeId}
                            name="officeId"
                            onChange={handleChange}
                        >
                        {
                            offices.map(o => (
                            <option key={o.id} value={o.id}>{o.name}</option>
                            ))
                        }
                        </select>
                    </div>
                </div>

                <div>
                    <div className="input-wrapper">
                        <label htmlFor="email">EMAIL ADDRESS</label>
                        <br/>
                        <input
                            type="text"
                            value={userInfo?.email}
                            name="email"
                            onChange={handleChange}
                        />
                    </div>

                    <div className="input-wrapper">
                        <label htmlFor="phoneNumber">PHONE</label>
                        <br/>
                        <input
                            type="text"
                            value={userInfo?.phoneNumber}
                            name="phoneNumber"
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div>
                    <div className="input-wrapper">
                        <label htmlFor="goodReadsAccount">GOOD READS ACCOUNT</label>
                        <br/>
                        <input
                            type="text"
                            value={userInfo?.goodReadsAccount}
                            name="goodReadsAccount"
                            onChange={handleChange}
                        />
                    </div>
                </div>   
        
            </div>
            <button onClick={() => OnSaveClick()}>Save changes</button>
        </div>
    )
}
