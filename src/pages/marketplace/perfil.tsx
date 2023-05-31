import LayoutMarketplace from 'layout/LayoutMarketplace';
import MarketplaceScreen from '../../screens/MarketplaceScreen';
import UserProfile from 'screens/ProfileScreen/UserProfile/UserProfile';

const Marketplace = () => {
  return (
    <LayoutMarketplace>
      <UserProfile />
    </LayoutMarketplace>
  );
};
export default Marketplace;
