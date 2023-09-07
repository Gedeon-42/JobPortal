import { topDealUsers } from "../../data"
const Box2 = ()=>{
    return(
        <div className="topBox">
 <h1>mosts jobs</h1>
      <div className="list">
        {topDealUsers.map(user=>(
          <div className="listItem" key={user.id}>
            <div className="user">
              
              <div className="userTexts">
                <span className="username">{user.username}</span>
                <span className="email">{user.email}</span>
              </div>
            </div>
            <span className="amount">${user.amount}</span>
          </div>
        ))}
      </div>
        </div>
    )
}
export default Box2