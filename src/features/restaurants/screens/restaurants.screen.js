import React, { useContext, useState } from "react";
import { TouchableOpacity } from "react-native";
import { RestaurantList } from "../components/restaurant-list.styles";
import { RestaurantInfoCard } from "../components/restaurant-info-card.component";
import { FadeInView } from "../../../components/animations/fade.animation";
import styled from "styled-components/native";
import { Spacer } from "../../../components/spacer/spacer.component";
import { FavouritesBar } from "../../../components/favourites/favourites-bar.component";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { RestaurantsContext } from "../../../services/restaurants/restaurants.context";
import { ActivityIndicator, Colors } from "react-native-paper";
import { Search } from "../components/search.component";
import { FavouritesContext } from "../../../services/favourites/favourites.context";
export const RestaurantsScreen = ({ navigation }) => {
    const [isToggled, setIsToggled] = useState(false);
    const { restaurants, isLoading } = useContext(RestaurantsContext);
    const { favourites } = useContext(FavouritesContext);
    return (
        <SafeArea>
            {isLoading && (
                <LoadingContainer>
                    <Loading
                        size={50}
                        animating={true}
                        color={Colors.blue300}
                    />
                </LoadingContainer>
            )}
            <Search
                isFavouritesToggled={isToggled}
                onFavouritesToggle={() => setIsToggled(!isToggled)}
            />
            {isToggled && (
                <FavouritesBar
                    favourites={favourites}
                    onNavigate={navigation.navigate}
                />
            )}
            <RestaurantList
                data={restaurants}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() =>
                            navigation.navigate("RestaurantDetails", {
                                restaurant: item,
                            })
                        }
                    >
                        <Spacer position="bottom" size="large">
                            <FadeInView>
                                <RestaurantInfoCard restaurant={item} />
                            </FadeInView>
                        </Spacer>
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item.name}
            />
        </SafeArea>
    );
};

const Loading = styled(ActivityIndicator)`
    margin-left: -25px;
`;
const LoadingContainer = styled.View`
    position: absolute;
    top: 50%;
    left: 50%;
`;
