#include <stdexcept>
#define BOOST_TEST_MODULE MyTest
#include <boost/test/included/unit_test.hpp>


BOOST_AUTO_TEST_CASE( test_failure_1 )
{
    BOOST_REQUIRE( 2 * 3 == 5 );
}

