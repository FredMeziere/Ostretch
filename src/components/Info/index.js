const Info = ({ user, handleClick }) => {
    return (
        <div className="infos-container">
            <p>Mon pseudo :</p>
            <div className='infos'> {user.username}</div>
            <p>Ma bio :</p>
            <div className='infos'> {user.biography}</div>
            <button className="modify-btn" onClick={handleClick}>Modifier</button>
        </div>
    )
}

export default Info;