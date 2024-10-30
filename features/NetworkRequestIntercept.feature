Feature: Network Intercept

    Scenario: Network request Intercept
        Given Login to application using "<username>" and "<password>"
        When click on order
        Then Intercept with different product id
        Then "You are not authorize to view this order" should be visible

        Examples:
            | username          | password    |
            | t073307@gmail.com | Test@123321 |

