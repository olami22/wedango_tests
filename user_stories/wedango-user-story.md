Wedango Lottery App – User Stories Document

Introduction
This document outlines the core user stories and acceptance criteria for the Wedango platform. Wedango enables users to create and participate in “Dango” games, which can be configured with different visibility and draw conditions.


 Story Title
As a user, I want to create dango games and participate in other dango games.


Story description
Implement a complete flow of creating Dango games, participate in exsiting games, join private dango games with code,

 Application Url
https://www.wedango.com/


Test Credentials
Admin
- Email: test@wedango.com
- Password: password123
User 1
 - Email: favouradeooa@gmail.com
 - Password: @Asdf1234

User 2
 - Email: faakinola@student.oauife.edu.ng
 - Password: @Asdf1234


User Roles
 Player (User)
A registered user who can:
Log in
Create dango games (both public and private)
Join public and private dangos
Participate in games
 Admin
A system-level user who can:
Create public dangos(new pools)
Manage games without participating
Do everything a Player can do.


Epics and User Stories
EPIC 1: User Authentication
1.1 User Login
User Story:
As a user
I want to log in to my account
So that I can access my dashboard and interact with dango games
Acceptance Criteria:
User can log in with valid credentials

Invalid credentials return an error message

Successful login redirects user to dashboard

User session is maintained

EPIC 2: Create Dango Game
2.1 Create Dango
User Story:
As a logged-in user
I want to create a dango game
So that I can invite others to participate
Acceptance Criteria:
Only authenticated users can create a dango

User can input required game details

Dango is successfully created

Creator is assigned as host

2.2 Set Dango Visibility
User Story:
As a user
I want to set my dango as public or private
So that I can control who can join
Acceptance Criteria:
User can choose between public and private

Public dango is visible to all users

Private dango is hidden from public listings

Private dango generates a unique join code and/or link

2.3 Configure Draw Trigger
User Story:
As a user
I want to define how the draw is triggered
So that the game runs automatically
Acceptance Criteria:
User can select:
oTime-based trigger

oSlot-filled trigger

Time-based trigger requires a valid future date/time

Slot-filled trigger activates when all slots are occupied

2.4 In-Game Chat 

User Story:
As a participant in a dango
I want to chat with other participants
So that I can communicate during the game

Acceptance Criteria:
- Each dango has a dedicated chat page
- Only users who joined the dango can access the chat
- Messages are displayed in chronological order
- User can send messages
- User can receive messages
- Empty messages are not allowed
- Messages should appear in near real-time

EPIC 3: Join Dango
3.1 Join Public Dango
User Story:
As a user
I want to browse and join public dangos
So that I can participate in available games
Acceptance Criteria:
User can view available public dangos

User can join a selected dango

User cannot join a full dango

Confirmation is shown after joining

3.2 Join Private Dango
User Story:
As a user
I want to join a private dango using a code or link
So that I can access restricted games
Acceptance Criteria:
User can enter a valid join code or use an invite link

Invalid code displays an error

Successful entry grants access to the dango

Private dangos are not publicly listed

EPIC 4: Admin Capabilities
4.1 Admin Create Public Dango
User Story:
As an admin
I want to create a public dango without participating
So that I can facilitate games
Acceptance Criteria:
Admin can create a public dango

Admin is not automatically added as a participant

Dango is visible in public listings

Admin can monitor the game


EPIC 5: Wallet & Transactions

5.1 Fund Wallet

User Story:
As a user
I want to add money to my wallet
So that I can use it to join dango games

Acceptance Criteria:
- User can initiate a deposit
- Payment must be successful before wallet is credited
- Wallet balance updates correctly after payment
- Failed transactions do not affect wallet balance


5.2 Withdraw Winnings

User Story:
As a user
I want to withdraw my winnings
So that I can access my funds

Acceptance Criteria:
- User can request withdrawal
- Withdrawal amount must not exceed wallet balance
- User receives confirmation after request
- Wallet balance updates after successful withdrawal