import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getOffices } from "../store/office/actions";

export default function UserForm({user}) {
    const dispatch = useDispatch();
    const [userInfo, setUserInfo] = useState(user)
    const offices = useSelector((state) => state.office.offices);
    
    const handleChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        if(name==="officeName") {
            let tempOffice = userInfo.office;
            tempOffice.name = value; 
            setUserInfo({...userInfo, office: tempOffice})
        } else {
        setUserInfo({...userInfo, [name]: value});
        }
        console.log(userInfo);
      };
    useEffect(() => {
      setUserInfo(user);
      dispatch(getOffices())
    }, [user])
    console.log(offices)

    return (
        <div>
            <div>
                <img src={userInfo.profilePictureUrl}></img>
            </div>
            <div>
                <div>            
                    <div className="input-wrapper">
                        <label htmlFor="profilePictureUrl">PROFILE PICTURE URL</label>
                        <br/>
                        <input
                            type="text"
                            value={userInfo.profilePictureUrl}
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
                            value={userInfo.fullName}
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
                            value={userInfo.role}
                            name="role"
                            onChange={handleChange}
                        />
                    </div>

                    <div className="input-wrapper">
                        <label htmlFor="bookTitle">DEFAULT OFFICE</label>
                        <br/>
                        <select
                            value={userInfo.officeId}
                            name="officeId"
                            onChange={handleChange}
                        >
                        {
                            offices.map(o => (
                            <option value={o.id}>{o.name}</option>
                            ))
                        }
                        </select>
                    </div>
                </div>

                <div>
                    <div className="input-wrapper">
                        <label htmlFor="bookTitle">EMAIL ADDRESS</label>
                        <br/>
                        <input
                            type="text"
                            value={userInfo.email}
                            name="fullName"
                            onChange={handleChange}
                        />
                    </div>

                    <div className="input-wrapper">
                        <label htmlFor="bookTitle">PHONE</label>
                        <br/>
                        <input
                            type="text"
                            value={userInfo.phoneNumber}
                            name="fullName"
                            onChange={handleChange}
                        />
                    </div>
                </div>
            </div>
            <button>Save changes</button>
        </div>
    )
}
