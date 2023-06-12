import React from "react";
import { Fade, Slide } from "react-awesome-reveal";
import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
} from "@chakra-ui/react";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const FAQSection = () => {
    const { data: faqData = [] } = useQuery({
        queryKey: ["faq-data"],
        queryFn: async () => {
            const res = await axios.get(
                "https://magic-minds-academy-server.vercel.app/faq-data"
            );
            return res.data;
        },
    });

    return (
        <div className="faq mx-5 mt-[130px]">
            <SectionTitle heading="Frequently Asked Questions (FAQs)"></SectionTitle>
            <div className="faq-container container mx-auto">
                <Accordion allowToggle>
                    {faqData.map((question) => (
                        <AccordionItem key={question?._id}>
                            <h2 className="font-medium text-lg">
                                <AccordionButton>
                                    <Box as="span" flex="1" textAlign="left">
                                        {question?.question}
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>
                                <Slide>{question?.answer}</Slide>
                            </AccordionPanel>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </div>
    );
};

export default FAQSection;
