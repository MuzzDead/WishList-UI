import React, { useState, useEffect } from "react";
import {
  Box,
  Image,
  Heading,
  Text,
  Button,
  VStack,
  IconButton,
  useToast,
  useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import axios from "axios";
import { useRouter } from "next/navigation";

const WishCard = ({
  id,
  imageUrl,
  title,
  description,
  createdAt,
  selectedByUserId,
  createdByUserId,
  currentUserId,
  isSelected,
  onSelect,
  onDelete, // Додано тут
})  => {
  const [isCardSelected, setIsCardSelected] = useState(isSelected);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const toast = useToast();
  const router = useRouter(); // Використовуємо useRouter для редиректу

  useEffect(() => {
    setIsCardSelected(isSelected);
  }, [isSelected]);

  const truncatedDescription =
    description.length > 180 ? description.slice(0, 177) + "..." : description;

  const handleSelect = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `https://localhost:7168/api/Wish/select/${id}`,
        null,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 200) {
        setIsCardSelected(true);
      }
    } catch (error) {
      console.error("Error selecting wish:", error);
    }
  };

  const handleDeselect = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `https://localhost:7168/api/Wish/deselect/${id}`,
        null,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 200) {
        setIsCardSelected(false);
      }
    } catch (error) {
      console.error("Error deselecting wish:", error);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this wish?")) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(`https://localhost:7168/api/Wish/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        toast({
          title: "Wish deleted.",
          description: "Your wish has been successfully deleted.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        if (onDelete) { // Перевірка перед викликом
          onDelete(id); // Викликає функцію з батьківського компонента для оновлення списку
        }
      } else {
        toast({
          title: "Error",
          description: "Failed to delete wish.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error deleting wish:", error);
      toast({
        title: "Error",
        description: "Failed to delete wish.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };


  const handleEdit = () => {
    router.push(`/wish/edit?id=${id}`); // Перехід до сторінки редагування
  };

  const isSelectedByCurrentUser = selectedByUserId === currentUserId;
  const isDisabled = isCardSelected && !isSelectedByCurrentUser;

  const handleButtonClick = () => {
    if (isCardSelected && isSelectedByCurrentUser) {
      handleDeselect();
    } else if (!isCardSelected) {
      handleSelect();
    }
  };

  return (
    <Box
      w="250px"
      h="350px"
      borderWidth="1px"
      borderRadius="xl"
      overflow="hidden"
      boxShadow="md"
      bg="white"
      transition="all 0.3s"
      display="flex"
      flexDirection="column"
    >
      <Box p="3" bg="gray.50" flexShrink={0}>
        <Image
          src={imageUrl || "https://i.imgflip.com/2siu6l.jpg?a480408"}
          alt="Wish Image"
          objectFit="cover"
          height="120px"
          width="100%"
          borderRadius="lg"
        />
      </Box>
      <VStack p="4" align="start" spacing="2" flex={1} justifyContent="space-between">
        <Box>
          <Heading as="h4" size="sm" noOfLines={1}>
            {title}
          </Heading>
          <Text fontSize="xs" mt={2}>
            {truncatedDescription}
          </Text>
        </Box>
        <Box w="100%">
          <Text fontSize="2xs" color="gray.500" mb={2}>
            Created: {createdAt}
          </Text>
          {createdByUserId === currentUserId ? (
            <Box display="flex" justifyContent="space-between" gap={1}>
              <IconButton
                icon={<EditIcon />}
                size="sm"
                colorScheme="blue"
                aria-label="Edit Wish"
                onClick={handleEdit} // Додаємо функцію редагування
              />
              <IconButton
                icon={<DeleteIcon />}
                size="sm"
                colorScheme="red"
                aria-label="Delete Wish"
                onClick={onOpen} // Відкриваємо діалог підтвердження
              />
              <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
              >
                <AlertDialogOverlay>
                  <AlertDialogContent>
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                      Delete Wish
                    </AlertDialogHeader>
                    <AlertDialogBody>
                      Are you sure? You can't undo this action.
                    </AlertDialogBody>
                    <AlertDialogFooter>
                      <Button ref={cancelRef} onClick={onClose}>
                        Cancel
                      </Button>
                      <Button colorScheme="red" onClick={handleDelete} ml={3}>
                        Delete
                      </Button>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialogOverlay>
              </AlertDialog>
            </Box>
          ) : (
            <Button
              size="sm"
              variant="solid"
              colorScheme={isCardSelected ? "red" : "teal"}
              w="full"
              onClick={handleButtonClick}
              isDisabled={isDisabled}
            >
              {isCardSelected
                ? isSelectedByCurrentUser
                  ? "Deselect"
                  : "Selected"
                : "Select"}
            </Button>
          )}
        </Box>
      </VStack>
    </Box>
  );
};

export default WishCard;
