function migrateUsersToLogi() {
            
           
            
    var process_user = [];
    process_user = all_users.data;
    
    var userExists = Get( `${ComposerUrl}/api/users`, AdminAccessToken.access_token )
        .then(async ( result ) => {
            
            for (let i = 0; i < process_user.length; i++) 
            {
            
                
                let newSingleValue = process_user[i];
                
                iterator = Object.keys(newSingleValue)
                var singleUserData=[];
            
                for (const key of iterator) {
                 
                  let keyValue = {};
                  
                  keyValue.key		 = key;
                  keyValue.value	 = newSingleValue[key];
                  keyValue.encrypted = false;
                  
                  singleUserData.push(keyValue);
                  
                }
                
                
                if(process_user[i].mainusername){
                    EndUsername = toString(process_user[i].mainusername);
                }
                
                
                
                
                if ( result.content.find( ( g ) => g.fullname === process_user[i].mainusername ) ) {
                    console.log("Exist = ",process_user[i].mainusername);
                    //return true;
                    
                    
                } else {
                    let groupArray =  process_user[i].group_id.split(",");
                    
                    let userLogiGroupIds = [];
                    for(let userGroup of groupArray){
                        userLogiGroupIds.push(logigroup[userGroup]);
                    }
                    
                    var ReqBody = {
                        "name": process_user[i].mainusername,
                        "accounts": [
                            {
                                "accountId": "61a8a25861abdb5159c2dda4",
                                "groups": userLogiGroupIds,
                                "roles": [],
                                "userAttributes": singleUserData
                            }
                        ],
                        "fullname": process_user[i].mainusername
                    }
                    
                    
                   
                    console.log("userId="+process_user[i].id + "_userName=" + process_user[i].mainusername);
                    
                     insertedUser =  await insertLogiUser( ReqBody );
                    
                    
                }
        }
        });

}



const insertLogiUser = async (ReqBody) => {
    returnData = await Post( `${ComposerUrl}/api/users`, AdminAccessToken.access_token, "Bearer", ReqBody );
    return returnData;	                        
}