---
title: How to deal with data management and protection during a project?
subtitle: "A useful framework made of actionable guidelines and tips for
  designers  struggling with data-related projects. "
category: Thematic
intro: >-
  Data Privacy is a human right. It refers to the right to privacy of personal
  information that people provide to public or private organizations to get the
  services and products they need.


  Today, in the era of massive digitization, where emerging technologies are increasingly used both in public and private sectors, the topic of privacy is becoming particularly relevant.


  Since data management and protection is such a big and complicated topic, we developed the Data Management Framework for Service Design*, which includes suggestions and tools to be used at different stages of the design process. Some are associated with legal issues, some others are more technical and can facilitate the collaboration between designers and engineers/technologists, or aim at facilitating the communication with the users and operationalizing certain ethical concepts. A synthetic and designer-friendly reference frame that can help a design team to manage data-related issues into everyday practice.
steps:
  - title: Clarify the purpose of data collection
    description: >-
      Before starting to work on a data-related project, it’s important to align
      everybody’s vision of the project and the role data might have. This
      initial alignment will provide a solid basis for later decisions on data
      processing, sharing, communication and so on. \

      The purpose for data collection can apply to the user research conducted to elaborate the service solution, to data gathering through digital platforms as part of the solution itself. \

      Concerning the first case, the availability of digital research methods and the enhancements of the use of these methods in commercial settings have brought new dimensions to the privacy discussions within the context of user research. In fact, user researchers have the ethical responsibility to collect information properly, firstly allowing participants to give informed consent, and then processing data in the right way when research is finished, considering  the type, the scope, the circumstances and the purpose of the processing along with connected risks.\

      Similarly, concerning data gathering through digital platforms, purposes can be manyfold. Some examples: retailers might use sales data and cloud-based point-of-sale software to understand the popularity of different products and ensure that they have the right levels of stock at the right times. Insurance might use claims registers to assess the validity of a claim and/or decide whether or not to offer cover, or to detect insurance fraud. Frontline health providers might collect data to proactively determine the treatment needs of their patients and work to prevent the need for more costly and traumatic treatments. Logistics and transport operators might use data on road and traffic conditions to optimize their operations and routes. And so on...
    tips: >-
      \- Identify the purpose for data collection and usage by answering
      questions as those you can find in the [The decision matrix - Canvas
      1](https://media.nesta.org.uk/documents/Data_Sharing_Toolkit_1.pdf?fbclid=IwAR0QMvkBg21UPYJ7b4PvT6mlt3ywHZsScqWEV95qeThUnLToLer0FwsnKeQ)
      by Nesta, or the [Data Ethics
      Framework](https://assets.publishing.service.gov.uk/government/uploads/system/uploads/attachment_data/file/923108/Data_Ethics_Framework_2020.pdf)
      - [Define and understand public benefic and user
      need](https://assets.publishing.service.gov.uk/government/uploads/system/uploads/attachment_data/file/923108/Data_Ethics_Framework_2020.pdf)
      by UK Government Digital Service;\

      - Understand the service ecosystem with all the actors involved in the process to clarify the different roles and responsibilities of each actor in data collection and processing and data privacy protection. System maps can help doing the job. \

      - Check you have considered (or will consider) all the data-related critical aspects throughout the different phases of data management by building a checklist or opting for something like the [Digital security and Privacy Protection UX Checklist](https://docs.google.com/presentation/d/1snDclSxKsyfUlqIH7HBWv9rdT6gIRPHqAuhaUjFZCoU/edit#slide=id.p)
  - title: Identify the type of data you need
    description: >-
      Once the purpose for data collection is clear and shared within the team,
      the need for data responsibility arises: a set of processes and procedures
      that allow the safe management of personal data during the different
      phases of the project. \

      First of all, while users involved in your research are asked to agree the request for consent for data collection, when it comes to data that are readily available (e.g. online reports, tweets, google trends,...), do not forget about the necessity to ask for permission to use them as well, or to follow and respect the terms of use of each online platform you are searching on.\

      Typically, designers have to deal with various types of personal data collected, from self-reported information to digital exhaust (the information that users generate during their daily digital lives). Within this context, you not only need to understand the legal requirements to meet privacy regulations, but also which treatments to put in place according to the sensitivity of that type of data.\

      In fact, while personal identifiers (such as names and surnames) are considered sensitive by definition, there are also nuanced categories of sensitive information that should be treated with attention by designers and their teams.\

      When thinking about how data will be managed and shared in your project, it’s important to first understand the characteristics of data and classify them by sensitivity levels, then you can determine which are the set of rules for each of those levels.
    tips: >-
      \- Understand the types of data you need to gather referring to common
      classification as that you can find in [The Data
      Spectrum](https://theodi.org/about-the-odi/the-data-spectrum/) by Open
      Data Institute;\

      - Check up the regulations in force in your country regarding data processing (e.g [GDPR](https://eur-lex.europa.eu/eli/reg/2016/679/oj) in Europe). If you’re serving international clients, you should be even more careful to adapt your solutions to different and sometimes conflicting regulations; \

      - Prepare and submit the required data collection informed consents according to the different data types you are willing to collect, such as the [Consent for Data Use](https://digitalimpact.io/toolkit/templates/consent-for-data-use/) suggested by Digital Impact. \

      - Classify data based on their sensitivity level and come up with different conditions for data sharing depending on the sensitivity. You can use the [Data Classification Matrix](https://data.humdata.org/dataset/2048a947-5714-4220-905b-e662cbcd14c8/resource/c7053042-fd68-44c7-ae24-a57890a48235/download/ocha-dr-guidelines-working-draft-032019.pdf) developed by The United Nations Office of The Humanitarian Affairs (OCHA).\

      - Identify and plan for potential data quality issues and biases, checking the documentations of your sources (or asking the collectors to specify the details).
  - title: Understand how data flows
    description: >-
      When working on data-related projects, it is useful to understand how data
      flows, how different algorithms process them and how they are shared.
      Understanding the mechanisms of data processing you could better protect
      your users’ privacy and achieve fairer and more well-functioning design
      solutions.\

      When an algorithm is designed to process data and make predictions on them, you need to consider the consistency of data with the kind of outcome you expect. For example, you cannot predict users’ creditworthiness based on their addresses. Designers should be conscious of these biases and participate in the design of the datasets to support analysts through their perspective on user experience.\

      Concerning data flows, you must also consider the possibility of data breach (when your database is accessed by third-parties without authorization). This security accident can hurt businesses or its users in serious ways. Even though designers are not necessarily responsible for such technicalities, it’s crucial to be aware of the issue and work with technicians to come up with preventative and recovery mechanisms for unwanted exposure of confidential, sensitive data.
    tips: >-
      \- Describe the data journey specifying inputs, outputs, where data is
      stored, and where it travels compiling a [Data flow
      diagram](https://www.lucidchart.com/pages/templates/data-flow/lucidchart-data-flow-diagram-logical-example)
      as that proposed by Lucidchart or the [Data Map
      Template](http://h41111.www4.hpe.com/privacy-toolkit/pdf/Data-Map-Template.pdf)
      you can find in [The Privacy
      Toolkit](http://h41111.www4.hpe.com/privacy-toolkit/overview.html) by
      Hewlett Packard Enterprise;


      \- Identify and plan for potential risks that might come from data misuse or missing data, building your [Data Responsibility Plan. You can start from the template](https://data.humdata.org/dataset/2048a947-5714-4220-905b-e662cbcd14c8/resource/c7053042-fd68-44c7-ae24-a57890a48235/download/ocha-dr-guidelines-working-draft-032019.pdf) you can find in the Data Responsibility Guidelines developed by The United Nations Office of The Humanitarian Affairs (OCHA);


      \- Identify and plan for potential limitations in terms of algorithmic and human biases, for example following the principles suggested by [IDEO’s AI ethics cards](https://www.ideo.com/blog/ai-needs-an-ethical-compass-this-tool-can-help).
  - title: Be aware of data impact
    description: >-
      The need to think critically about data privacy doesn’t end when the
      project is successfully launched. It is important to continue assessing
      the impact of data collection and processing on different stakeholders,
      and also remain updated with the rapidly changing legal and ethical
      regulations.\

      When sharing data with colleagues, clients and 3rd parties, you should know that not everyone has the same awareness about data privacy. Similarly, even if aware of their responsibilities, not everyone has the same level of training to share data in a safe and respectful way. It’s not required to become a legal expert, but it’s necessary to clarify under which conditions we can share data and which measures or methods we can adopt. \

      On the other hand, most users are not always aware of their privacy rights and of certain potential threats as they don’t have full access to the service dynamics. By monitoring data journeys and sharing them transparently, designers can continue protecting users’ rights, build long-term relationships with them, and act ethically. \

      When assessing the positive and negative impact on different stakeholder groups, you should first define these impacts (e.g. what will happen in case of data breach?) and then develop standardized metrics to evaluate them over time. It is also recommended to develop a systematic way to communicate these impacts so that stakeholders can act upon it.\

      This could be part of the designer’s responsibilities as well, firstly to help make sure that visualized/analyzed data is interpreted in an ethical way, and then to communicate the impact of data collection to users and stakeholders as part of the design solutions.
    tips: >-
      \- Provide all stakeholders with clear and comprehensible information for
      data sharing filling an [Information sharing
      protocol](https://data.humdata.org/dataset/2048a947-5714-4220-905b-e662cbcd14c8/resource/c7053042-fd68-44c7-ae24-a57890a48235/download/ocha-dr-guidelines-working-draft-032019.pdf)
      as the one
      [](https://data.humdata.org/dataset/2048a947-5714-4220-905b-e662cbcd14c8/resource/c7053042-fd68-44c7-ae24-a57890a48235/download/ocha-dr-guidelines-working-draft-032019.pdf)
      you can find in the Data Responsibility Guidelines developed by The United
      Nations Office of The Humanitarian Affairs (OCHA);


      \- Educate users to be always aware of their rights and potential threats while building trustful long-term relationships for your client organizations. You might consider using [Personas for privacy and security](https://medium.com/@gusandrews/user-personas-for-privacy-and-security-a8b35ae5a63b) to highlight the knowledge and awareness gaps of different user types in terms of their data privacy rights and take punctual actions to improve user experience in order to fill the gaps. Or you can look at the [Pillars for data handling](https://raftcollective.com/thinking/gdpr/#popUpProtect) elaborated by Raft Collective;


      \- Identify and communicate potential data impacts for each stakeholder group (e.g. inform users about third party data sharing or terms of services and make sure they have control over their information). You can look at the [Privacy statement](https://www.visualcontracts.eu/legal/privacy-statement/) by Visual Contracts as a good example to follow;


      \- Come up with measuring and treatment mechanisms for these impacts. To prevent data breaches you can look at the  [Guide to the general data protection regulation (GDPR)](https://raftcollective.com/thinking/gdpr/#popUpProtect) by the UK Information Commissioner’s Office. Make sure to get creative with the metrics and to not miss the qualitative impacts.
toolkit:
  image: /assets/images/uploads/data-privacy-toolkit.jpg
  pdf: /assets/images/uploads/data-privacy-framework.pdf
references:
  - name: "Deloitte (2016), Reimagining customer privacy for the digital age: Going
      beyond compliance in financial services. "
    link: https://www2.deloitte.com/content/dam/Deloitte/br/Documents/financial-services/Deloitte-reimagining-consumer-privacy-for-digital-age.pdf
  - name: Soffer, T., & Cohen, A. (2014) Privacy Perception of Adolescents in a
      Digital World. Bulletin of Science, Technology & Society, 34(5-6),
      145–158.
  - name: "Vitale, J., Tonkin, M., Herse, S., Ojha, S., Clark, J., Williams, M. A.,
      Whang X. & Judge, W. (2018, February). Be more transparent and users will
      like you: A robot privacy and user experience design experiment. In
      Proceedings of the 2018 ACM/IEEE International Conference on Human-Robot
      Interaction (pp. 379-387)"
  - name: "Sapere research group & Covec (2015) Data Driven Innovation in New
      Zealand, "
    link: https://srgexpert.com/wp-content/uploads/2017/11/Data_Innovation_Report_WEB.pdf
  - name: "Fletcher J., 2017, Data as an economic growth factor and currency:
      Personal API’s, data management, and the emerging data economy.  Raft. "
    link: https://raftcollective.com/media/Raft-Data_as_an_economic_growth_factor_and_currency.pdf
---
