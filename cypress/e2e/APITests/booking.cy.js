/// <reference types="cypress" />

let bookingId = '';
let headers = {};
describe('Booking api testing - 1º version', () => {

  beforeEach(() => {
    cy.request({
      method: 'POST',
      url:'/auth',
      headers: { 'Content-type': 'application/json' },
      body: {
        username: "admin",
        password: "password123"
      }
    }).as('token');

  })
  it('1 - Get all booking ids', () => {
    cy.request({
      method: 'GET',
      url:'/booking',
      headers: {  'Content-Type': 'application/json' }
    }).then((response) => {	
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array');
      expect(response.body).to.have.lengthOf.at.least(1);
      expect(response.body[0]).to.have.property('bookingid');
    });
  });

  it('2 - Get booking id by firstname', () => {
    cy.request({
      method: 'GET',
      url:'/booking',
      qs: { 'firstName' : 'test'},
      headers: { 'Content-Type': 'application/json'}
    }).then((response) => {	
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array');
      expect(response.body).to.have.lengthOf.at.least(1);
      expect(response.body[0]).to.have.property('bookingid');
    });
  });

  it('3 - Get booking id by checkin date', () => {
    cy.request({
      method: 'GET',
      url:'/booking',
      qs: { 'checkin' : '2014-05-21'},
      headers: { 'Content-Type': 'application/json'}
    }).then((response) => {	
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array');
      expect(response.body).to.have.lengthOf.at.least(1);
      expect(response.body[0]).to.have.property('bookingid');
    });
  });
  it('4 - Get booking by id', () => {
    cy.request({
      method: 'POST',
      url: '/booking',
      headers: { 'Content-Type': 'application/json' },
      body: {
        firstname: 'Carol',
        lastname: 'Louzada',
        totalprice: 150,
        depositpaid: true,
        bookingdates: {
          checkin: '2018-01-01',
          checkout: '2019-01-01'
        },
        additionalneeds: 'Breakfast'
      }
    }).then((createdBooking) => {
      cy.request({
        method: 'GET',
        url: '/booking/' + createdBooking.body.bookingid,
        headers: { 'Accept': 'application/json' }
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.headers).to.have.property('content-type', 'application/json; charset=utf-8')
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('firstname').and.to.be.a('string');
        expect(response.body).to.have.property('lastname').and.to.be.a('string');
        expect(response.body).to.have.property('totalprice').and.to.be.a('number');
        expect(response.body).to.have.property('depositpaid').and.to.be.a('boolean');
        expect(response.body).to.have.property('bookingdates').and.to.be.an('object');
        expect(response.body.bookingdates).to.have.property('checkin').and.to.be.a('string');
        expect(response.body.bookingdates).to.have.property('checkout').and.to.be.a('string');
      });
    });
  });

  it('5 - Creating a new booking with success', () => {
  
    cy.request({
      method: 'POST',
      url:'/booking',
      headers: { 'Content-Type': 'application/json'},
      body: {
        firstname: "Carol",
        lastname: "Louzada",
        totalprice: 150,
        depositpaid: true,
        bookingdates: {
            checkin: "2018-01-01",
            checkout: "2019-01-01"
        },
        additionalneeds: "Breakfast"
      }
    }).then((response) => {	
      expect(response.status).to.eq(200);
      expect(response.headers).to.have.property('content-type', 'application/json; charset=utf-8')
      expect(response.body).to.be.an('object');
      expect(response.body).to.have.property('bookingid').and.to.be.a('number');

      cy.wrap(response).as('bookingCreated', {type: 'static'});
      const booginkID = 0;
      cy.get('@bookingCreated').then(()=>{

      })
      
      expect(response.body).to.have.property('booking').and.to.be.an('object');
      expect(response.body.booking).to.have.property('firstname', 'Carol').and.to.be.a('string');
      expect(response.body.booking).to.have.property('lastname', 'Louzada').and.to.be.a('string');
      expect(response.body.booking).to.have.property('totalprice').and.to.be.a('number');
      expect(response.body.booking).to.have.property('depositpaid').and.to.be.a('boolean');
      expect(response.body.booking).to.have.property('bookingdates').and.to.be.an('object');
      expect(response.body.booking.bookingdates).to.have.property('checkin').and.to.be.a('string');
      expect(response.body.booking.bookingdates).to.have.property('checkout').and.to.be.a('string');
    }).then(function() {

      cy.request({
        method: 'GET',
        url:'/booking/'+ this.bookingCreated.body.bookingid ,
        headers: { 'Accept': 'application/json' }
      }).then((response) => {	
        expect(response.status).to.eq(200);
        expect(response.headers).to.have.property('content-type', 'application/json; charset=utf-8')
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('firstname', 'Carol').and.to.be.a('string');
        expect(response.body).to.have.property('lastname', 'Louzada').and.to.be.a('string');
        expect(response.body).to.have.property('totalprice').and.to.be.a('number');
        expect(response.body).to.have.property('depositpaid').and.to.be.a('boolean');
        expect(response.body).to.have.property('bookingdates').and.to.be.an('object');
        expect(response.body.bookingdates).to.have.property('checkin').and.to.be.a('string');
        expect(response.body.bookingdates).to.have.property('checkout').and.to.be.a('string');
      });
    });
  });

  it('5 - Creating a new booking with success - alternative 1', () => {
  
    cy.request({
      method: 'POST',
      url:'/booking',
      headers: { 'Content-Type': 'application/json'},
      body: {
        firstname: "Carol",
        lastname: "Louzada",
        totalprice: 150,
        depositpaid: true,
        bookingdates: {
            checkin: "2018-01-01",
            checkout: "2019-01-01"
        },
        additionalneeds: "Breakfast"
      }
    }).then((response) => {	
      expect(response.status).to.eq(200);
      expect(response.headers).to.have.property('content-type', 'application/json; charset=utf-8')
      expect(response.body).to.be.an('object');
      expect(response.body).to.have.property('bookingid').and.to.be.a('number');
      expect(response.body).to.have.property('booking').and.to.be.an('object');
      expect(response.body.booking).to.have.property('firstname', 'Carol').and.to.be.a('string');
      expect(response.body.booking).to.have.property('lastname', 'Louzada').and.to.be.a('string');
      expect(response.body.booking).to.have.property('totalprice').and.to.be.a('number');
      expect(response.body.booking).to.have.property('depositpaid').and.to.be.a('boolean');
      expect(response.body.booking).to.have.property('bookingdates').and.to.be.an('object');
      expect(response.body.booking.bookingdates).to.have.property('checkin').and.to.be.a('string');
      expect(response.body.booking.bookingdates).to.have.property('checkout').and.to.be.a('string');

      cy.wrap(response.body.bookingid).as('bookingid', {type: 'static'});
    });

      cy.get('@bookingid').then(bookingId => {
        cy.request({
          method: 'GET',
          url:'/booking/'+ bookingId ,
          headers: { 'Content-Type': 'application/json'}
        }).then((response) => {	
          expect(response.status).to.eq(200);
          expect(response.headers).to.have.property('content-type', 'application/json; charset=utf-8')
          expect(response.body).to.be.an('object');
          expect(response.body).to.have.property('firstname', 'Carol').and.to.be.a('string');
          expect(response.body).to.have.property('lastname', 'Louzada').and.to.be.a('string');
          expect(response.body).to.have.property('totalprice').and.to.be.a('number');
          expect(response.body).to.have.property('depositpaid').and.to.be.a('boolean');
          expect(response.body).to.have.property('bookingdates').and.to.be.an('object');
          expect(response.body.bookingdates).to.have.property('checkin').and.to.be.a('string');
          expect(response.body.bookingdates).to.have.property('checkout').and.to.be.a('string');
        });
      })
      
    
  });

  it('5 - Creating a new booking with success - alternative 2', () => {
  
    cy.request({
      method: 'POST',
      url:'/booking',
      headers: {'Content-Type': 'application/json'},
      body: {
        firstname: "Carol",
        lastname: "Louzada",
        totalprice: 150,
        depositpaid: true,
        bookingdates: {
            checkin: "2018-01-01",
            checkout: "2019-01-01"
        },
        additionalneeds: "Breakfast"
      }
    }).then(() => {
      cy.request({
        method: 'POST',
        url:'/booking',
        headers: {'Content-Type': 'application/json'},
        body: {
          firstname: "Carol",
          lastname: "Louzada",
          totalprice: 150,
          depositpaid: true,
          bookingdates: {
              checkin: "2018-01-01",
              checkout: "2019-01-01"
          },
          additionalneeds: "Breakfast"
        }
      }).then((response) => {	
        expect(response.status).to.eq(200);
        expect(response.headers).to.have.property('content-type', 'application/json; charset=utf-8')
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('bookingid').and.to.be.a('number');
        expect(response.body).to.have.property('booking').and.to.be.an('object');
        expect(response.body.booking).to.have.property('firstname', 'Carol').and.to.be.a('string');
        expect(response.body.booking).to.have.property('lastname', 'Louzada').and.to.be.a('string');
        expect(response.body.booking).to.have.property('totalprice').and.to.be.a('number');
        expect(response.body.booking).to.have.property('depositpaid').and.to.be.a('boolean');
        expect(response.body.booking).to.have.property('bookingdates').and.to.be.an('object');
        expect(response.body.booking.bookingdates).to.have.property('checkin').and.to.be.a('string');
        expect(response.body.booking.bookingdates).to.have.property('checkout').and.to.be.a('string');
  
        bookingId = response.body.bookingid;
      
      }).then(()=> {
        cy.request({
          method: 'GET',
          url:'/booking/'+ bookingId ,
          headers: { 'Content-Type': 'application/json'}
        }).then((response) => {	
          expect(response.status).to.eq(200);
          expect(response.headers).to.have.property('content-type', 'application/json; charset=utf-8')
          expect(response.body).to.be.an('object');
          expect(response.body).to.have.property('firstname', 'Carol').and.to.be.a('string');
          expect(response.body).to.have.property('lastname', 'Louzada').and.to.be.a('string');
          expect(response.body).to.have.property('totalprice').and.to.be.a('number');
          expect(response.body).to.have.property('depositpaid').and.to.be.a('boolean');
          expect(response.body).to.have.property('bookingdates').and.to.be.an('object');
          expect(response.body.bookingdates).to.have.property('checkin').and.to.be.a('string');
          expect(response.body.bookingdates).to.have.property('checkout').and.to.be.a('string');
        });
      });
      
    })
       
      
  });

  it('6 - Update booking by id without authorization', () => {
    cy.request({
      method: 'POST',
      url:'/booking',
      headers: { 'Content-Type': 'application/json'},
      body: {
        firstname: "Luiza",
        lastname: "Santos",
        totalprice: 200,
        depositpaid: false,
        bookingdates: {
            checkin: "2018-01-01",
            checkout: "2019-01-01"
        },
        additionalneeds: "Orange Juice"
      }
    }).then((response) => {
      cy.request({
        method: 'PUT',
        url:'/booking/'+ response.body.bookingid,
        headers: { 'Accept': 'application/json', 'Content-type': 'application/json'},
        failOnStatusCode: false
      }).then((response) => {	
        expect(response.status).to.eq(403);
        expect(response.headers).to.have.property('content-type', 'text/plain; charset=utf-8')
        expect(response.body).to.be.string
      });
    });
  });

  it('7 - Update booking by id with authorization header', () => {
    cy.get('@token').then((token) => {
      cy.request({
        method: 'POST',
        url:'/booking',
        headers: { 'Content-Type': 'application/json'},
        body: {
          firstname: "Luiza",
          lastname: "Santos",
          totalprice: 200,
          depositpaid: false,
          bookingdates: {
              checkin: "2018-01-01",
              checkout: "2019-01-01"
          },
          additionalneeds: "Orange Juice"
        }
      }).then((response) => {
        cy.request({
          method: 'PUT',
          url:'/booking/'+ response.body.bookingid,
          auth:{ user: 'admin', password: 'password123'},
          headers: { 
          'Accept': 'application/json', 
          'Content-type': 'application/json',  
        },
        body: {
          firstname: "Luiza",
          lastname: "Santos Modificado",
          totalprice: 200,
          depositpaid: false,
          bookingdates: {
              checkin: "2018-01-01",
              checkout: "2019-01-01"
          },
          additionalneeds: "Orange Juice"
        },
          failOnStatusCode: false
        }).then((response) => {	
        
          // O que você colocaria de asseração ?
        });
      });
    });
  });
});

describe('Booking api testing - 2ª version',() => {

  beforeEach(() => {

    cy.authToken("admin", "password123").as('token');

    cy.fixture('booking/bookingPost.json').as('newBooking');
    cy.fixture('booking/bookingPut.json').as('updatedBooking');
  })

  it('1 - Get all booking ids', () => {

    cy.getRequest('/booking',{ 'Content-Type': 'application/json'}).then(response => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array');
      expect(response.body).to.have.lengthOf.at.least(1);
      expect(response.body[0]).to.have.property('bookingid');
    })
  });

  it('2 - Get booking id by firstname', () => {
   
    let queryString = { 'firstName' : 'test'};

    cy.getRequest('/booking',{ 'Content-Type': 'application/json'}, queryString).then(response => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array');
      expect(response.body).to.have.lengthOf.at.least(1);
      expect(response.body[0]).to.have.property('bookingid');
    });
  });

  it('3 - Get booking id by checkin date', () => {
 
    let queryString = { 'checkin' : '2014-05-21'};

    cy.getRequest('/booking',{ 'Content-Type': 'application/json'}, queryString).then(response => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array');
      expect(response.body).to.have.lengthOf.at.least(1);
      expect(response.body[0]).to.have.property('bookingid');
    })
  });

  it('4 - Get booking by id', () => {
    cy.get('@newBooking').then((newBooking) => {
      cy.postRequest('/booking', { 'Content-type': 'application/json' }, newBooking)
        .then((createdBooking) => {
          cy.getRequest('/booking/' + createdBooking.body.bookingid, { 'Content-Type': 'application/json' })
            .then(response => {
              expect(response.status).to.eq(200);
              expect(response.headers).to.have.property('content-type', 'application/json; charset=utf-8')
              expect(response.body).to.be.an('object');
              expect(response.body).to.have.property('firstname').and.to.be.a('string');
              expect(response.body).to.have.property('lastname').and.to.be.a('string');
              expect(response.body).to.have.property('totalprice').and.to.be.a('number');
              expect(response.body).to.have.property('depositpaid').and.to.be.a('boolean');
              expect(response.body).to.have.property('bookingdates').and.to.be.an('object');
              expect(response.body.bookingdates).to.have.property('checkin').and.to.be.a('string');
              expect(response.body.bookingdates).to.have.property('checkout').and.to.be.a('string');
            });
        });
    });
  });

  it('5 - Creating a new booking with success return status code 200', () => {
  
    cy.fixture('booking/bookingPost.json').then((newBooking) => {

      cy.postRequest('/booking',{'Content-type':'application/json'}, newBooking).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.headers).to.have.property('content-type', 'application/json; charset=utf-8')
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('bookingid').and.to.be.a('number');
        expect(response.body).to.have.property('booking').and.to.be.an('object');
        expect(response.body.booking).to.have.property('firstname', 'Carol').and.to.be.a('string');
        expect(response.body.booking).to.have.property('lastname', 'Louzada').and.to.be.a('string');
        expect(response.body.booking).to.have.property('totalprice').and.to.be.a('number');
        expect(response.body.booking).to.have.property('depositpaid').and.to.be.a('boolean');
        expect(response.body.booking).to.have.property('bookingdates').and.to.be.an('object');
        expect(response.body.booking.bookingdates).to.have.property('checkin').and.to.be.a('string');
        expect(response.body.booking.bookingdates).to.have.property('checkout').and.to.be.a('string');

        cy.wrap(response).as('bookingCreated', {type: 'static'});
      }).then(function() {

        cy.getRequest('/booking/'+ this.bookingCreated.body.bookingid,{'Content-type':'application/json'})
        .then((response) => {	
          expect(response.status).to.eq(200);
          expect(response.headers).to.have.property('content-type', 'application/json; charset=utf-8')
          expect(response.body).to.be.an('object');
          expect(response.body).to.have.property('firstname', 'Carol').and.to.be.a('string');
          expect(response.body).to.have.property('lastname', 'Louzada').and.to.be.a('string');
          expect(response.body).to.have.property('totalprice').and.to.be.a('number');
          expect(response.body).to.have.property('depositpaid').and.to.be.a('boolean');
          expect(response.body).to.have.property('bookingdates').and.to.be.an('object');
          expect(response.body.bookingdates).to.have.property('checkin').and.to.be.a('string');
          expect(response.body.bookingdates).to.have.property('checkout').and.to.be.a('string');
        });
      });
    });
  });

  it('6 - Update booking by id without authorization', () => {

     headers = {
       "Accept": "application/json", 
       "Content-type": "application/json"
    };

    cy.get('@newBooking').then((newBooking) => {
      cy.postRequest('/booking',{'Content-type':'application/json'}, newBooking)
        .then((response) => {

          cy.get('@updatedBooking').then((updatedBooking) => {
            cy.putRequest('/booking/'+ response.body.bookingid, headers, updatedBooking)
              .then((response) => {	
                expect(response.status).to.eq(403);
                expect(response.headers).to.have.property('content-type', 'text/plain; charset=utf-8')
                expect(response.body).to.be.an("string")
            });
          });
        });
    });
  });

  it("7 - Update booking by id with authorization header", () => {

    cy.get('@token').then((token) => {
      headers = {
        "Accept": "application/json",
        "Content-type": "application/json",
        "Cookie": "token="+token,
      };

      cy.get("@newBooking").then((newBooking) => {
        cy.postRequest("/booking", {'Content-type':'application/json'}, newBooking)
          .then((response) => {

            cy.get("@updatedBooking").then((updatedBooking) => {
              cy.putRequest(
                "/booking/" + response.body.bookingid,
                headers,
                updatedBooking
              ).then((response) => {
                  expect(response.status).to.eq(200);
                  expect(response.headers).to.have.property(
                  "content-type",
                  "application/json; charset=utf-8"
                );
                expect(response.body).to.be.an("object");
              });
            });
          });
      });
    });
  });

});

