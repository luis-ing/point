import { useState, useEffect } from "react";
import { Input, List, ListItem, Box, Card, CardBody } from "@chakra-ui/react";

const Autocomplete = ({
    suggestions,
    onSelected,
    placeholder = "Search",
    isRequired = false,
  }) => {
  const [inputValue, setInputValue] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(-1);

  useEffect(
    () => {
      const filtered = suggestions.filter(suggestion =>
        suggestion.name.toLowerCase().includes(inputValue.toLowerCase())
      );
      setFilteredSuggestions(filtered);
    },
    [inputValue, suggestions]
  );

  const handleInputChange = e => {
    setInputValue(e.target.value);
  };

  const handleInputBlur = () => {
    setTimeout(() => {
      setIsOpen(false);
    }, 300);
  };

  const handleInputFocus = () => {
    setIsOpen(true);
  };

  const handleKeyDown = e => {
    if (isOpen) {
      if (
        e.key === "ArrowDown" &&
        selectedOptionIndex < filteredSuggestions.length - 1
      ) {
        setSelectedOptionIndex(selectedOptionIndex + 1);
      } else if (e.key === "ArrowUp" && selectedOptionIndex > 0) {
        setSelectedOptionIndex(selectedOptionIndex - 1);
      } else if (e.key === "Enter" && selectedOptionIndex !== -1) {
        handleSelectSuggestion(filteredSuggestions[selectedOptionIndex]);
      }
    }
  };

  const handleSelectSuggestion = suggestion => {
    setInputValue(suggestion.name);
    setIsOpen(false);
    onSelected(suggestion);
    setSelectedOptionIndex(-1);
  };

  return (
    <Box position="relative">
      <Input
        value={inputValue}
        onChange={handleInputChange}
        placeholder={placeholder}
        onBlur={handleInputBlur}
        onFocus={handleInputFocus}
        onKeyDown={handleKeyDown}
        autoComplete="off"
        isRequired={isRequired}
      />
      {isOpen &&
        <List position="absolute" zIndex="1" width="100%" boxShadow="md" mt={2}>
          <Card>
            <CardBody p={0} style={{ zIndex: 99999 }}>
              {filteredSuggestions.map((suggestion, index) =>
                <ListItem
                  key={index}
                  onClick={() => handleSelectSuggestion(suggestion)}
                  onMouseEnter={() => setSelectedOptionIndex(index)}
                  cursor="pointer"
                  p={2}
                  borderRadius={8}
                  bg={selectedOptionIndex === index && "orange.300"}
                  _hover={{ bg: "orange.300" }}
                >
                  {suggestion.name}
                </ListItem>
              )}
            </CardBody>
          </Card>
        </List>}
    </Box>
  );
};

export default Autocomplete;
