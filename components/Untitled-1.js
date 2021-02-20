
     /*       
                <View>
                <View>
                    <FlatList
                    data={this.state.AcountListData}
                    renderItem={({item}) =>(
                        <View>   
                            <View>
                                <Text>User ID:    {item.user_id}</Text>
                                <Text>First Name: {item.first_name}</Text>
                                <Text>Last Name:  {item.last_name}</Text>
                                <Text>Email:      {item.email}</Text>
                                <Text>:      </Text>
                                <Text>Favourite_locations:   </Text>
                            </View>
                            <View>
                                    {item.favourite_locations.map((v) => (
                                        <View>  
                                            <Text>Location ID:    {v.location_id}</Text>
                                            <Text>Location Name:  {v.location_name}</Text>
                                            <Text>Location Town:  {v.location_town}</Text>
                                            <Text>Latitude:       {v.latitude}</Text>
                                            <Text>Longitude:      {v.longitude}</Text>
                                            <Text>Photo:  {v.photo_path}</Text>
                                            <Text>Average Overall Rating:  {v.avg_overall_rating}</Text>
                                            <Text>Average Price Rating:  {v.avg_price_rating}</Text>
                                            <Text>Average Quality Rating:  {v.avg_quality_rating}</Text>
                                            <Text>Average Clenliness Rating:  {v.avg_clenliness_rating}</Text>
                                            <Text>:  </Text>
                                           
                                            
                                        </View> 
                                    ))}
                            </View>
                            <View>
                                    {item.reviews.map((p) => (
                                        
                                        <View> 
                                            {p.review.map((l) =>( 
                                            <View>
                                                <Text>Review ID:          {l.review_id}</Text>
                                                <Text>Overall Rating:     {l.overall_rating}</Text>
                                                <Text>Price Rating:       {l.price_rating}</Text>
                                                <Text>Quality Rating:     {l.quality_rating}</Text>
                                                <Text>Clenliness Rating:  {l.clenliness_rating}</Text>
                                                <Text>Comment:            {l.review_boady}</Text>
                                                <Text>:  </Text>
                                            </View>
                                            ))}  
                                        </View> 
                                    ))}
                            </View>
                            <View>
                                    {item.liked_reviews.map((t) => (
                                        
                                        <View> 
                                            {t.review.map((f) =>( 
                                            <View>
                                                <Text>Review ID:          {f.review_id}</Text>
                                                <Text>Overall Rating:     {f.overall_rating}</Text>
                                                <Text>Price Rating:       {f.price_rating}</Text>
                                                <Text>Quality Rating:     {f.quality_rating}</Text>
                                                <Text>Clenliness Rating:  {f.clenliness_rating}</Text>
                                                <Text>Comment:            {f.review_boady}</Text>
                                                <Text>Likes:              {f.likes}</Text>
                                                <Text>:  </Text>
                                            </View>
                                            ))}  
                                        </View> 
                                    ))}
                            </View>
                        </View>   

                        
                    )}
                    keyExtractor={(item, index) => item.location_id.toString()}
                    />
                </View>
                
            </View>
            )



            <View>
                    




                </View>






 <View>
                    <View>
                        <FlatList
                        data={this.state.AcountListData}
                        renderItem={({item}) =>(
                            <View>   
                                <Text>Liked Reviews</Text>
                                <View>
                                        {item.liked_reviews.map((t) => (
                                        <View>    
                                                <View> 
                                                    {t.review.map((f) =>( 

                                                    <View>

                                                        <Text>Review ID:          {f.review_id}</Text>
                                                        <Text>Overall Rating:     {f.overall_rating}</Text>
                                                        <Text>Price Rating:       {f.price_rating}</Text>
                                                        <Text>Quality Rating:     {f.quality_rating}</Text>
                                                        <Text>Clenliness Rating:  {f.clenliness_rating}</Text>
                                                        <Text>Comment:            {f.review_boady}</Text>
                                                        <Text>Likes:              {f.likes}</Text>
                                                        <Text>:  </Text>
                                                    </View>

                                                    ))}  
                                                </View>
                                                <View>
                                                    {t.location.map((q) => (
                                                    <View>
                                                        <Text>Location</Text>
                                                            <View>
                                                                <Text>Location ID:          {q.location_id}</Text>
                                                                <Text>Location Name:     {q.location_name}</Text>
                                                                <Text>Location Town:       {q.price_rating}</Text>
                                                                <Text>Latitude:     {q.quality_rating}</Text>
                                                                <Text>Longitude:  {q.clenliness_rating}</Text>
                                                                <Text>Photo:            {q.review_boady}</Text>
                                                                <Text>:  </Text>
                                                            </View>
                                                                
                                                    </View>
                                                    ))}             
                                                        
                                            </View> 
                                        </View>    
                                        ))}
                                </View>
                            </View>   

                            
                        )}
                        keyExtractor={(item, index) => item.location_id.toString()}
                        />
                    </View>
                <View>
                    <TouchableOpacity
                        style={styles.button}
                        onPress = {() => this.props.navigation.goBack()}>
                        <Text style={styles.buttonText}>Go Back</Text>
                    </TouchableOpacity>
                </View>
            </View>
            
            
            
            
            
            
            
            
            
            
            
            
            
 <View> 
    {t.review.map((f) =>( 
                                                                                                                 
        <View>

            <Text>Review ID:          {f.review_id}</Text>
            <Text>Overall Rating:     {f.overall_rating}</Text>
            <Text>Price Rating:       {f.price_rating}</Text>
            <Text>Quality Rating:     {f.quality_rating}</Text>
            <Text>Clenliness Rating:  {f.clenliness_rating}</Text>
            <Text>Comment:            {f.review_boady}</Text>
            <Text>Likes:              {f.likes}</Text>
            <Text>:  </Text>
        </View>
    ))}  
</View>
    <View>
        {item.location.map((q) => (
            <View>
                <Text>Location</Text>
                <View>
                <Text>Location ID:          {q.location_id}</Text>
                <Text>Location Name:     {q.location_name}</Text>
                                                                <Text>Location Town:       {q.price_rating}</Text>
                                                                <Text>Latitude:     {q.quality_rating}</Text>
                                                                <Text>Longitude:  {q.clenliness_rating}</Text>
                                                                <Text>Photo:            {q.review_boady}</Text>
                                                                <Text>:  </Text>
                                                            </View>
                                                                
                                                    </View>
                                                    ))}             
                                                        
                                            </View>             
            
            
            
            
            
            
            
            
            
            
            
           <FlatList
                        data={this.state.LocationListData}
                        renderItem={({item}) =>(
                            <View>
                                <Text>Location ID : {item.location_id}</Text>
                                <Text>Location Name : {item.location_name}</Text>
                                <Button 
                                    onPress = {() => this.handleLocationId(item.location_id,item.location_name)}
                                    title="Set Location"
                                    color="#841584"/>
                            </View>
                        )}
                        keyExtractor={(item, index) => item.location_id.toString()}
                        />
*/
