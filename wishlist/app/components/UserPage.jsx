// app/components/UserPage.js
import React from 'react';
import { Box, VStack, Heading, Container, Divider } from '@chakra-ui/react';
import WishList from './WishList';

const mockWishes = [
    { image: "https://www.asus.com/media/Odin/Websites/global/Series/9.png", title: "New Laptop", description: "A powerful laptop for work A powerful laptop for work A powerful laptop for work A powerful laptop for work A powerful laptop for work A powerful laptop for work A powerful laptop ", createdAt: "2023-05-15" },
    { image: "https://offshore-freedom.com/wp-content/uploads/2024/04/living-in-the-bahamas-nassau.jpeg", title: "Vacation", description: "A relaxing beach vacation", createdAt: "2023-06-01" },
    { image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxVUpd37ROVc_7LEW291Ql0HkBUUNUjEqjaA&s", title: "Camera", description: "A professional DSLR camera", createdAt: "2023-06-10" },
    { image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2kQF-Vd35VDqu88HReZnXaXy2Mt3HfHKjrg&s", title: "Book Collection", description: "Complete set of Harry Potter books", createdAt: "2023-06-15" },
    { image: "https://www.cnet.com/a/img/resize/e77eaea049a55a7744636aca299bdfe8fd410911/hub/2023/09/20/9a707e3f-6b94-4edf-ae84-12a10ad04a68/230919-site-apple-watch-ultra-2-review.jpg?auto=webp&fit=crop&height=360&width=640", title: "Smartwatch", description: "Latest model smartwatch", createdAt: "2023-06-20" },
    { image: "https://blog.playstation.com/tachyon/2023/10/cd56722db7b991b3d7a33f1bafd55f80d0ac553d.png?resize=1088%2C612&crop_strategy=smart ", title: "Gaming Console", description: "Latest generation gaming console with VR support", createdAt: "2023-07-10" },
    { image: "https://images.adsttc.com/media/images/5d44/14fa/284d/d1fd/3a00/003d/large_jpg/eiffel-tower-in-paris-151-medium.jpg?1564742900", title: "Trip to Paris", description: "A romantic getaway to the city of love", createdAt: "2023-08-01" },
    { image: "https://www.pmtonline.co.uk/media/wysiwyg/Antiquity-Gs1-Electric-Guitar-Cherry-Red-1_1.jpg", title: "Acoustic Guitar", description: "A high-quality acoustic guitar for music enthusiasts", createdAt: "2023-09-01" },
    { image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAx9xM5IAX91BsFoQdpT6COq4qI9thjqIMRQ&s", title: "New Smartphone", description: "The latest flagship smartphone with advanced features", createdAt: "2023-10-01" },
    { image: "https://www.cooksprofessional.co.uk/wp-content/uploads/2022/11/Coffee-Machine-Grey-LS-1-2000px.jpg", title: "Coffee Machine", description: "A high-end coffee machine for coffee lovers", createdAt: "2023-11-01" },
    { image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjdvsQK0NdyvNVDrtLK0T70tGO44ck8Rhwnw&s", title: "Kitchen Appliances", description: "A set of high-quality kitchen appliances for home cooks", createdAt: "2023-12-01" },
    { image: "https://blog.playstation.com/tachyon/2023/10/cd56722db7b991b3d7a33f1bafd55f80d0ac553d.png?resize=1088%2C612&crop_strategy=smart ", title: "Gaming Console", description: "Latest generation gaming console with VR support", createdAt: "2023-07-10" },
    { image: "https://images.adsttc.com/media/images/5d44/14fa/284d/d1fd/3a00/003d/large_jpg/eiffel-tower-in-paris-151-medium.jpg?1564742900", title: "Trip to Paris", description: "A romantic getaway to the city of love", createdAt: "2023-08-01" },
    { image: "https://www.pmtonline.co.uk/media/wysiwyg/Antiquity-Gs1-Electric-Guitar-Cherry-Red-1_1.jpg", title: "Acoustic Guitar", description: "A high-quality acoustic guitar for music enthusiasts", createdAt: "2023-09-01" },
    { image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAx9xM5IAX91BsFoQdpT6COq4qI9thjqIMRQ&s", title: "New Smartphone", description: "The latest flagship smartphone with advanced features", createdAt: "2023-10-01" },
    { image: "https://www.cooksprofessional.co.uk/wp-content/uploads/2022/11/Coffee-Machine-Grey-LS-1-2000px.jpg", title: "Coffee Machine", description: "A high-end coffee machine for coffee lovers", createdAt: "2023-11-01" },
    { image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjdvsQK0NdyvNVDrtLK0T70tGO44ck8Rhwnw&s", title: "Kitchen Appliances", description: "A set of high-quality kitchen appliances for home cooks", createdAt: "2023-12-01" },
  ];

  const UserPage = ({ username }) => {
    return (
      <Box minHeight="100vh" bg="gray.50">
        <Container maxW="container.xl" py={8}>
          <VStack spacing={8}>
            <Heading as="h1" size="2xl" textAlign="center">
              {username}
            </Heading>
            <Divider borderColor="gray.300" borderWidth="2px" width="80%" />
            <WishList wishes={mockWishes} />
            <Divider borderColor="gray.300" borderWidth="2px" width="80%" />
          </VStack>
        </Container>
      </Box>
    );
  };

export default UserPage;