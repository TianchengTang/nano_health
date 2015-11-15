#Website Manual#


###I. Introduction to Healsis###
####Healsis####
Healsis is a data management web-app cooperates with NanoHealth. We help doctors and social workers monitor and analyze health data more easily.

####NanoHealth####
NanoHealth is a social enterprise specializing in chronic disease management and provides holistic managed care services by creating local health networks and using innovative technology to bring cost-effective health care at the doorstep. NanoHealth creates a network of community health workers called Saathis and equips them with a low-cost point-of-care device called the Doc-in-a-Bag™. NanoHealth's Saathis, who are well-trained and empowered, form a strong network of care-givers extending the reach of health care right to the doorstep of the patient.

####Who Are We####
We are currently graduate students of Boston University.

Team members: Chang Yan, Da Shu, Tiancheng Tang, Xin Li, Xuanyi Chen

###II. Website Structures###
![WebsiteMap](https://github.com/WilliamLeeBravo/healsis/raw/master/Website_Map.png)

###III. Develop Tools###
Basically, we use MEAN, which contains AngularJS, MongoDB, NodeJS, and Express, to construct our front end and back end. We registered an AWS account to deal with the web service. For source control, we use Github as the tool. To be more efficient, we chose Teambition as the scrum management tool to help us monitor the whole project.

###IV. Basic Functions###
####For Common User####
![CommonUser](https://github.com/WilliamLeeBravo/healsis/raw/master/CommonUser.png)

####For Registered User####
![RegisterUser](https://github.com/WilliamLeeBravo/healsis/raw/master/RegisterUser.png)

###V. Getting Started - Creating An Account###
####Creating your account####
To create a new account on Healsis follow the steps below:

 1. Visit http://toubib.org

 2. Click on the "SIGNIN OR SIGNUP" button

 3. Choose your identity

 4. Enter your first and last name, email address, basic information, registration key, and choose a password
 5. Click "Register"

####Configure your initial settings####
After you create your account, you may need to enter some additional information.

###VI. Dashboard Overview###

The dashboard is the central hub for this website. It is where doctors, clients, and also social workers manage their information and work. On this page, doctors and social workers can search their patients' data, clients could check their recent files as well. When you finish, you can logout and the website will jump back to the homepage. 

###VII. Website Tools###
####Homepage####

In the homepage, people can see the introduction about our services, features, work flow, and staffs, no matter they are register users or common users.

![Service](https://github.com/WilliamLeeBravo/healsis/raw/master/service.PNG)
![Features](https://github.com/WilliamLeeBravo/healsis/raw/master/features.PNG)
![Workflow](https://github.com/WilliamLeeBravo/healsis/raw/master/workflow.PNG)
![People](https://github.com/WilliamLeeBravo/healsis/raw/master/people.PNG)

People can also contact us using our system.

![ContactUs](https://github.com/WilliamLeeBravo/healsis/raw/master/ContackUs.png) 

####Client Data Inquiry####

In this category, doctors have the authority to get all the information including a H-Graph. Social workers could see client inquiry, neighborhood status, assign tasks, and H-Graph. Patients, however, could only see their own H-Graph.
If all the blanks are empty, they the website shows "Please fill in something" after clicking the search button.
After click the search button, all the inquired information will be shown in a table detailedly.

####Client Data Update####

After input the patient ID, and press the "Find" button, all the following data of this patient will be automatically shown up. If the input Patient ID does not exist, the website will inform the user in a red sentence.
When finish updating, users can click the "Update" button to store the decent data.

####Neighborhood Statistics####

In this part, users can get detail information about general health conditions, hypertension conditions, and diabetes conditions which are sorted by locations. The overall health condition of a patient is calculated and graded by our own algorithm developed based on H-Graph.

####Staff Con tack Info####

This is a search page. First, you can choose the capital letter which represents the staff you want to get access to. The default tab is the "Star(icon)" tab, showing the leadership of the organization which is ordered alphabetically.
The other tabs are also ordered alphabetically, if clicked, they will not care about whether someone belongs to the leadership or not.

####My Profile####

When users want to update their personal files, they could finish their job here.

####Assign Tasks####

When doctors want to assign tasks to specifically social workers, they could assign here.

####My Tasks####

This is where the social workers are decided to take the tasks and finish them.

####Generate Registration Key####

First, user should choose their Reg Key Type, Second click "Generate" button. Then the User ID and Registration Key will be showed bellow the button.

####My H-Graph####

Developers designed their own algorithms to adept the original H-Graph to a more efficient one.

###VIII. Other Services###

If you need any other services, please contact us via our system.
    
