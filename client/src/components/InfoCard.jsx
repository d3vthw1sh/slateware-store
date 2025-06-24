import { Box, Heading, Text } from '@chakra-ui/react';

function InfoCard({ title, description }) {
  return (
    <Box p={6} bg="gray.50" borderRadius="md" boxShadow="md">
      <Heading fontSize="xl" mb={2}>
        {title}
      </Heading>
      <Text color="gray.600">{description}</Text>
    </Box>
  );
}

export default InfoCard;
