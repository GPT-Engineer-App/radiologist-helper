import React, { useState } from "react";
import { Box, Heading, Text, Input, Textarea, Button, Flex, Menu, MenuButton, MenuList, MenuItem, IconButton, useToast, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, useDisclosure, Image } from "@chakra-ui/react";
import { FaMicrophone, FaBold, FaHighlighter, FaImage, FaDownload, FaShare, FaBook } from "react-icons/fa";

const Index = () => {
  const [report, setReport] = useState("");
  const [isListening, setIsListening] = useState(false);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleChange = (e) => {
    setReport(e.target.value);
  };

  const handleDictation = () => {
    setIsListening(!isListening);
    toast({
      title: isListening ? "Ditado parado" : "Ditado iniciado",
      status: isListening ? "info" : "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const handleInsert = (text) => {
    setReport(report + text);
  };

  const handleHighlight = () => {
    const selectedText = window.getSelection().toString();
    const highlightedText = `\n\n* ${selectedText}\n\n`;
    setReport(report.replace(selectedText, highlightedText));
  };

  const handleTemplate = () => {
    const template = `TÉCNICA:
    
ACHADOS:

IMPRESSÃO:`;
    setReport(template);
  };

  return (
    <Box p={8} bg="gray.50" minH="100vh">
      <Heading mb={8} color="teal.600">
        RadReport
      </Heading>

      <Flex>
        <Box flex={1} mr={8}>
          <Textarea value={report} onChange={handleChange} placeholder="Digite ou dite o laudo aqui..." size="lg" h="50vh" />

          <Flex mt={4} justify="space-between">
            <Flex>
              <IconButton icon={<FaMicrophone />} onClick={handleDictation} colorScheme={isListening ? "red" : "teal"} variant="outline" mr={2} />
              <Button onClick={() => handleInsert("TÉCNICA:")} colorScheme="teal" variant="outline" mr={2}>
                Técnica
              </Button>
              <Button onClick={() => handleInsert("ACHADOS:")} colorScheme="teal" variant="outline" mr={2}>
                Achados
              </Button>
              <Button onClick={() => handleInsert("IMPRESSÃO:")} colorScheme="teal" variant="outline" mr={2}>
                Impressão
              </Button>
              <IconButton icon={<FaBold />} onClick={() => handleInsert("**")} variant="outline" mr={2} />
              <IconButton icon={<FaHighlighter />} onClick={handleHighlight} variant="outline" />
            </Flex>

            <Flex>
              <IconButton icon={<FaImage />} onClick={onOpen} variant="outline" mr={2} />
              <IconButton icon={<FaDownload />} variant="outline" mr={2} />
              <IconButton icon={<FaShare />} variant="outline" mr={2} />
              <IconButton icon={<FaBook />} variant="outline" />
            </Flex>
          </Flex>
        </Box>

        <Box w="300px" bg="white" p={4} shadow="md" rounded="md">
          <Heading size="md" mb={4}>
            Termos Comuns
          </Heading>

          <Menu>
            <MenuButton as={Button} colorScheme="teal" mb={2} w="100%">
              Abreviações
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => handleInsert(" TC ")}>TC</MenuItem>
              <MenuItem onClick={() => handleInsert(" RM ")}>RM</MenuItem>
              <MenuItem onClick={() => handleInsert(" USG ")}>USG</MenuItem>
            </MenuList>
          </Menu>

          <Menu>
            <MenuButton as={Button} colorScheme="teal" mb={2} w="100%">
              Frases
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => handleInsert("Ausência de alterações significativas. ")}>Ausência de alterações significativas.</MenuItem>
              <MenuItem onClick={() => handleInsert("Comparado ao exame anterior, ")}>Comparado ao exame anterior,</MenuItem>
            </MenuList>
          </Menu>

          <Button colorScheme="teal" variant="outline" onClick={handleTemplate} w="100%">
            Modelo de Laudo
          </Button>
        </Box>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Inserir Imagem</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Image src="https://images.unsplash.com/photo-1453847668862-487637052f8a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwc2NhbnxlbnwwfHx8fDE3MTEyNDEyMjF8MA&ixlib=rb-4.0.3&q=80&w=1080" mb={4} />
            <Text>Selecione uma imagem de TC/RM para inserir no laudo.</Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Index;
